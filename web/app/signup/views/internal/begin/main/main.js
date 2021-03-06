(function ()
{
  signupApp.config(['$compileProvider', function ($compileProvider)
  {
    var oldWhiteList = $compileProvider.aHrefSanitizationWhitelist();
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob):|data:image\//);
  }]);
  signupApp.config(['engStateProvider', function (state)
  {
    state.add({view: 'engViewBegin', title: "Begin", url: '/begin', role: 'ROLE_ALL', menus: {'main': 1}});
  }]);
  signupApp.directive("engViewBegin",['$aside','$http', '$rootScope', 'PropelSOAService', '$sce','engValidation','engAlert','$q', begin]);
  function begin($aside,$http,$rootScope,PropelSOAService,$sce,engValidation,engAlert,$q)
  {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/app/signup/views/internal/begin/main/partial.html",
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
            $scope.SignUp.CVV = "";
            $scope.SignUp.Country = "US";
            $scope.today = new Date();
            $scope.selectedProductId = false;
            var qToken = $q.defer();
            qToken.resolve(true);
            qToken = qToken.promise;
            if ( token && token.length > 1 )
            {
              $scope.selectedProductId = token[token.length-1];
                $scope.SignUp.Country='US';
            }
            // Get the products to choose from
            var pQuery = PropelSOAService.getQuery('Engine', 'Billing', 'Product');
            pQuery.isPublic = true;
            pQuery.addEqualFilter('TypeCode',"ESTIMATOR");
            var qRes = pQuery.runQuery($scope, 'productresult');
            var signupRules = engValidation.getRuleset('frontEndPurchase');
            $scope.SignUp.EXTRA_LICENSE=0;
            if ( $scope.selectedProductId == -1 )
            {
              $scope.SignUp.EXTRA_LICENSE=1;
            }

            $q.all([qRes, qToken, signupRules]).then(function () {
              $scope.Products = $scope.productresult.collection;
              angular.forEach($scope.Products,function(product){
                if ( product.model.Code == 'EXTRA_LICENSE' )
                {
                  $scope.ExtraProduct = product.model;
                }
              });
              $scope.loaded=true;
              $scope.Products.sort(function (a, b) {
                return ((a.model.Position < b.model.Position) ? -1 : (a.model.Position > b.model.Position) ? 1 : 0 );
              });
              if (typeof $scope.SignUp == 'object') {
                if ($scope.SignUp.ProductId) {
                  $scope.selectedProductId = $scope.SignUp.ProductId;
                  $scope.change($scope.getPlan());
                }
                else if ($scope.selectedProductId)
                {
                  $scope.SignUp.ProductId = $scope.selectedProductId;
                  angular.forEach($scope.Products,function(product){
                    if (product.model.ProductId == $scope.SignUp.ProductId )
                    {
                      $scope.change(product);
                    }
                  });
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
              $scope.validator = engValidation.getValidator('frontEndPurchase');
              $scope.validator.watch($scope, $scope.SignUp);
            });
          };
          $scope.reloadData();
          $scope.noProduct = function() {
            $scope.selectedProductId = -1;
            $scope.SignUp.EXTRA_LICENSE=1;
            $scope.setPhase('COLLECT');
          };


          // Get the chosen plan or a property thereof
          $scope.getPlan = function(field)
          {
            if ( ! $scope.selectedProductId || $scope.selectedProductId == "-1" )
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
              $scope.SignUp.EXTRA_LICENSE=0;
              $scope.selectedProductId = plan.model.ProductId;
              angular.extend($scope.SignUp,plan.model);
              $scope.setPhase('COLLECT');
            }
          };
          $scope.setAmount = function()
          {
            $scope.SignUp.Amount = 0;
            if ( $scope.selectedProductId != -1)
            {
              $scope.SignUp.Amount +=parseInt($scope.getPlan('OneTimeAmount'),10);
            }
            $scope.SignUp.Amount += $scope.getExtraAmount();
          };
          $scope.getExtraAmount = function()
          {
            return parseInt($scope.ExtraProduct.OneTimeAmount,10) * parseInt($scope.SignUp.EXTRA_LICENSE,10);
          };

          $scope.env_url = env_url;

          //  Credit Card Processing process.
          $scope.cancelCC = function(){
            engAlert.clearContextSwitch();
            $scope.selectedProductId=false;
            $scope.reloadData();
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
              $scope.SignUp.Name = $scope.SignUp.CompanyName + ' - ' + $scope.SignUp.FirstName + ' ' + $scope.SignUp.LastName;
              if ( $scope.selectedProductId != -1 )
              {
                $scope.SignUp.ProductCodes[$scope.getPlan('Code')] = 1;
              }
              if ( $scope.SignUp.EXTRA_LICENSE )
              {
                $scope.SignUp.ProductCodes.EXTRA_LICENSE = $scope.SignUp.EXTRA_LICENSE;
              }
              qTax = $http.get(env_url + '/public/billing/tax/adhoc?data='+encodeURIComponent(JSON.stringify($scope.SignUp)) ).success(function (result) {
                $scope.Totals = result.Data;
                $scope.vault=true;
                $scope.setPhase('CONFIRM');
              });

            },function(result){
              engAlert.alert('payment_error','Please ensure all information is correct before saving.', 'paymentInfo');
            });
          };
          $scope.confirm = function ()
          {
            engAlert.clearContextSwitch();
            angular.element('body').addClass('waiting-for-angular');
            confirmed = $http.post(env_url + '/public/internal/purchase',$scope.SignUp).then(function (result) {
              angular.element('body').removeClass('waiting-for-angular');
              $scope.PurchaseResult = result.data.Data;
              $scope.ReceiptNumber = result.data.Data.ReceiptNumber;
              $scope.setPhase('RECEIPT');
            },function(result){
              angular.element('body').removeClass('waiting-for-angular');
              $scope.setPhase('COLLECT');
            });
          };

        }
      ]
    };
  }
})();
