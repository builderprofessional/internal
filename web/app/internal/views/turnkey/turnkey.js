(function()
{
	  internalApp.config(['engStateProvider', function (state)
		{
			state.add({view: 'engViewTurnkey', title: "Turn-Key Websites", url: '/turnkey', role: 'ROLE_ALL', menus: {'main': 1}});
		}]);
		internalApp.directive("engViewTurnkey",["$modal",turnkey]);
		function turnkey($modal)
		{
			return {
				restrict: "A",
				scope: {},
				templateUrl: "/app/internal/views/turnkey/partial.html",
				controller: ['$scope',
					function($scope)
					{
						angular.noop();
						$scope.signup = function()
						{
							$scope.signUpModal = $modal(
									{
										title:'Begin Signup for Builder Professional Turn-key Site',
										contentTemplate: 'sign-up-modal.html',
										scope:$scope
									});
						};
					}
				]
			};
		}
	   
})();
