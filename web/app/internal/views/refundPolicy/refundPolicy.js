(function ()
{
  internalApp.directive("viewRefundPolicy", ['$http', '$location', '$stateParams', 'engState',
    'engAlert','$modal', refundPolicy]);
  function refundPolicy($http, $location, $stateParams, engState, engAlert, $modal)
  {
    return {
      restrict: "A",
      scope: {},
      templateUrl: "/app/internal/views/refundPolicy/partial.html",
      controller: ['$scope',
        function ($scope)
        {
          $scope.Privacy = {};

          $scope.cancel = function(){
            $scope.refundPolicyModal.hide();
          };
        }
      ]
    };
  }
})();