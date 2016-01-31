(function()
{
	  internalApp.config(['engStateProvider', function (state)
		{
			state.add({view: 'engViewTurnkey', title: "Turn Key Websites", url: '/turnkey', role: 'ROLE_ALL', menus: {'main': 1}});
		}]);
		internalApp.directive("engViewTurnkey",turnkey);
		function turnkey()
		{
			return {
				restrict: "A",
				scope: {},
				templateUrl: "/app/internal/views/turnkey/partial.html",
				controller: ['$scope',
					function($scope)
					{
						angular.noop();
					}
				]
			};
		}
	   
})();
