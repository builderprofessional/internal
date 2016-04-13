(function ()
{
  internalApp.directive("viewContactUs", ['$http', '$location', 'PropelSOAService', '$stateParams', 'engState',
                                                    'engValidation', '$q', 'engAlert','$modal', contactUs]);
  function contactUs($http, $location, PropelSOAService, $stateParams, engState, engValidation, $q, engAlert, $modal)
  {
    return {
      restrict: "A",
      scope: {
        'viewContactUs':'@',
        'addSubject':'@'
      },
      templateUrl: "/app/internal/views/contact/partial.html",
      controller: ['$scope',
        function ($scope)
        {
          $scope.viewContactUs = ($scope.viewContactUs && $scope.viewContactUs.length > 0) ? $scope.viewContactUs : 'Get Started with a Free Consultation';
          $scope.ContactUs = {};
          var qRules = engValidation.getRuleset('contactus');
          $q.all([qRules]).then(function ()
            {
              $scope.validator = engValidation.getValidator('contactus');
              $scope.validator.watch($scope, $scope.ContactUs);
            });
          $scope.contact = function()
          {
            $scope.contactUsModal = $modal(
              {
                title:'Get in Touch with Builder Professional',
                contentTemplate: 'contact-us-modal.html',
                scope:$scope
              });
          };

          $scope.cancel = function(){
            $scope.contactUsModal.hide();
          };
          $scope.save = function ()
          {
            $scope.validator.isValid().then(function(result){
              // Clear out the Braintree model to ensure that we are keeping the values for as short a time as possible
              $scope.ContactUs.Question = ((typeof $scope.addSubject != 'undefined' && $scope.addSubject) ? $scope.addSubject.toString() : '') + "  " + $scope.ContactUs.Question;
              $http.post(env_url+'/public/internal/contactUs'+env_postfix,$scope.ContactUs).then(function(){
                engAlert.success("Thanks for contacting us.  We will get back with you as soon as possible.", 'contactSuccess');
                $scope.ContactUs = {};
              });
              $scope.contactUsModal.hide();
            },function(result){
              engAlert.alert('contactus_error','Please ensure all information is correct before saving.', 'contactError');
            });
          };
        }
      ]
    };
  }
})();