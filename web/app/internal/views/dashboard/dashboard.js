(function()
{
	  internalApp.config(['engStateProvider', function (state)
		{
			state.add({view: 'engViewDashboard', title: "Home", url: '/dashboard', role: 'ROLE_ALL', menus: {'main': 1}});
			// Now add all external links
			state.add({external:true, name: 'ViewTraining', title: "Training", url: 'https://buildertraining.net', role: 'ROLE_ALL', menus: {'main': 3}});
		}]);
		internalApp.directive("engViewDashboard",dashboard);
		function dashboard()
		{
			return {
				restrict: "A",
				scope: {},
				templateUrl: "/app/internal/views/dashboard/partial.html",
				controller: ['$scope',
					function($scope)
					{
						angular.noop();
					}
				]
			};
		}
	   
})();
