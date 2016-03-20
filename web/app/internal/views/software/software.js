(function()
{
	  internalApp.config(['engStateProvider', function (state)
		{
			state.add({view: 'engViewSoftware', title: "Software", url: '/software', role: 'ROLE_ALL', menus: {'main': 4}});
		}]);
		internalApp.directive("engViewSoftware",software);
		function software()
		{
			return {
				restrict: "A",
				scope: {},
				templateUrl: "/app/internal/views/software/partial.html",
				controller: ['$scope',
					function($scope)
					{
						angular.noop();
					}
				]
			};
		}
	   
})();
