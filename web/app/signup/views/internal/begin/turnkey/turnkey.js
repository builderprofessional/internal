(function ()
{
  signupApp.config(['$compileProvider', function ($compileProvider)
  {
    var oldWhiteList = $compileProvider.aHrefSanitizationWhitelist();
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
  }]);
  signupApp.config(['engStateProvider', function (state)
  {
    state.add({view: 'engViewTurnkey', title: "Turnkey", url: '/turnkey', role: 'ROLE_ALL', menus: {'main': 1}});
  }]);
  signupApp.directive("engViewTurnkey",['$aside','$http', '$rootScope', 'PropelSOAService', '$sce','engValidation','engAlert','$q', turnkey]);
  function turnkey($aside,$http,$rootScope,PropelSOAService,$sce,engValidation,engAlert,$q)
  {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/app/signup/views/internal/begin/turnkey/partial.html",
      controller: ['$scope',
        function ($scope)
        {
          /*
           * Phases ARE:
           * CHOOSE
           * COLLECT
           * CONFIRM
           * RECEIPT
           * We default to COLLECT and only back up to CHOOSE if there is no product Id.
           */
          $scope.setPhase = function(phase)
          {
            if ( phase != $scope.phase )
            {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
            $scope.phase = phase;
            if ( $scope.phase == 'CHOOSE')
            {
              $scope.selectedProductId=false;
            }
            if ( $scope.phase == 'CONFIRM')
            {
              if ( typeof $scope.SignUp.MailingList == 'undefined' )
              {
                $scope.SignUp.MailingList=true;
              }
            }
          };
          $scope.SignUp = {};

          var token = location.search.match(/(token=([^&]*))/);


          // The only data we can really reload is the plan which should be unset to be ready for choosing
          $scope.reloadData = function() {
            $scope.phase = 'COLLECT';
            $scope.SignUp = {};
            $scope.SignUp.CreditCardNumber = "";
            $scope.SignUp.ExpirationMonth = "";
            $scope.SignUp.ExpirationYear = "";
            $scope.SignUp.ProductId = 5;
            $scope.SignUp.CVV = "";
            $scope.SignUp.Country = "US";
            $scope.today = new Date();
            $scope.selectedProductId = false;
            var qToken = $q.defer();
            qToken.resolve(true);
            qToken = qToken.promise;
            if ( token && token.length > 1 )
            {
              qToken = $http.get(env_url + '/public/internal/turnKeySignup/findByToken/' + token[token.length - 1]).then(function (result) {
                $scope.SignUp = result.data.Data;
                $scope.SignUp.ProductId = 5;
                $scope.SignUp.Country='US';
              });
            }
            // Get the products to choose from
            var pQuery = PropelSOAService.getQuery('Engine', 'Billing', 'Product');
            pQuery.isPublic = true;
            pQuery.addEqualFilter('TypeCode',"TURNKEY");
            var qRes = pQuery.runQuery($scope, 'productresult');
            var signupRules = engValidation.getRuleset('completeSignup');
            var confirmRules = engValidation.getRuleset('confirmSignup');

            $q.all([qRes, qToken, signupRules,confirmRules]).then(function () {
              $scope.Products = $scope.productresult.collection;
              $scope.loaded=true;
              $scope.Products.sort(function (a, b) {
                return ((a.model.Position < b.model.Position) ? -1 : (a.model.Position > b.model.Position) ? 1 : 0 );
              });
              if (typeof $scope.SignUp == 'object') {
                if ($scope.SignUp.ProductId) {
                  $scope.selectedProductId = $scope.SignUp.ProductId;
                  $scope.change($scope.getPlan());
                }
                else
                {
                  $scope.setPhase('CHOOSE');
                }
              }
              else {
                $scope.selectedProductId = false;
              }
              if ($scope.SignUp.Name) {
                $scope.SignUp.FirstName = $scope.SignUp.Name.split(' ')[0];
                $scope.SignUp.LastName = $scope.SignUp.Name.split(' ').slice(1).join(' ');
              }
              $scope.validator = engValidation.getValidator('completeSignup');
              $scope.validator.watch($scope, $scope.SignUp);
              $scope.cvalidator = engValidation.getValidator('confirmSignup');
              $scope.cvalidator.watch($scope, $scope.SignUp);
            });
          };
          $scope.reloadData();


          // Get the chosen plan or a property thereof
          $scope.getPlan = function(field)
          {
            if ( ! $scope.selectedProductId )
            {
              return false;
            }
            else
            {
              for(var i=0;i<$scope.Products.length;i++)
              {
                if ( $scope.Products[i].model.ProductId == $scope.selectedProductId )
                {
                  if ( field && $scope.Products[i].model && $scope.Products[i].model.hasOwnProperty(field))
                  {
                    return $scope.Products[i].model[field];
                  }
                  return $scope.Products[i];
                }
              }
              return false;
            }
          };
          $scope.canChange = function()
          {
            var can =  $scope.phase.localeCompare('CONFIRM') <= 0;
            return can;
          };

          // change plans
          $scope.change = function (plan)
          {
            if ($.isEmptyObject(plan))
            {
              $scope.selectedProductId = false;
            }
            else
            {
              $scope.selectedProductId = plan.model.ProductId;
              angular.extend($scope.SignUp,plan.model);
              $scope.setPhase('COLLECT');
            }
          };
          $scope.setAmount = function()
          {
            $scope.SignUp.Amount = 0;
            $scope.SignUp.Amount +=parseInt($scope.getPlan('OneTimeAmount'),10);
          };

          $scope.env_url = env_url;

          //  Credit Card Processing process.
          $scope.cancelCC = function(){
            engAlert.clearContextSwitch();
            document.location.href='/';
           // $scope.selectedProductId=5;

            //$scope.reloadData();
          };
          $scope.saveCC = function ()
          {
            engAlert.clearContextSwitch();
            $scope.setAmount();
            $scope.validator.isValid().then(function(result){
              var braintree = Braintree.create(braintreeCSE);
              $scope.SignUp.CreditCardNumberEncrypted = braintree.encrypt($scope.SignUp.CreditCardNumber);
              $scope.SignUp.ExpirationMonthEncrypted = braintree.encrypt($scope.SignUp.ExpirationMonth);
              $scope.SignUp.ExpirationYearEncrypted = braintree.encrypt($scope.SignUp.ExpirationYear);
              $scope.SignUp.CVVEncrypted = braintree.encrypt($scope.SignUp.CVV);
              // Clear out the Braintree model to ensure that we are keeping the values for as short a time as possible
              $scope.last4 = $scope.SignUp.CreditCardNumber.substr(-4);
              $scope.SignUp.CreditCardNumber = "";
              $scope.SignUp.ExpirationMonth = "";
              $scope.SignUp.ExpirationYear = "";
              $scope.SignUp.CVV = "";
              $scope.SignUp.ProductCodes = {};
              $scope.SignUp.Name = $scope.SignUp.FirstName + ' ' + $scope.SignUp.LastName;
              qTax = $http.get(env_url + '/public/billing/tax/adhoc?data='+encodeURIComponent(JSON.stringify($scope.SignUp)) ).success(function (result) {
                $scope.Totals = result.Data;
                $scope.vault=true;
                $scope.setPhase('CONFIRM');
              });

            },function(result){
              engAlert.alert('payment_error','Please ensure all information is correct before saving.', 'paymentInfo');
            });
          };
          $scope.confirm = function () {
            engAlert.clearContextSwitch();
            $scope.cvalidator.isValid().then(function(result){
              engAlert.clear("error");
              angular.element('body').addClass('waiting-for-angular');
              confirmed = $http.post(env_url + '/public/internal/signup', $scope.SignUp).then(function (result) {
                angular.element('body').removeClass('waiting-for-angular');
                $scope.ClientId = result.data.Data.ClientId;
                $scope.UserId = result.data.Data.UserId;
                $scope.ReceiptNumber = result.data.Data.ReceiptNumber;
                var query = PropelSOAService.getQuery(
                    'Engine', 'Billing', 'Client'
                );

                query.addInnerJoin('ClientProduct->Product');
                query.addInnerJoin('Company->Address');


                var qClient = query.runQueryOne($scope, 'BillingClient');

                $q.all([qClient]).then(function () {
                  $scope.client = $scope.BillingClient;
                  $scope.setPhase('RECEIPT');
                });
              }, function (result) {
                angular.element('body').removeClass('waiting-for-angular');
                //$scope.setPhase('COLLECT');
                $scope.setPhase('RECEIPT');
              });
            },function(result){
              engAlert.alert('error','You must agree to the terms and conditions before continuing.', 'paymentInfo');
              $('html, body').animate({scrollTop: $("#AgreedToTerms").offset().top-180},500);
            });
          };

        }
      ]
    };
  }
})();
