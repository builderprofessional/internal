(function()
{
	  internalApp.config(['engStateProvider', function (state)
		{
			state.add({view: 'viewContactPage', title: "Contact Us", url: '/contactus', role: 'ROLE_ALL', menus: {'about': 3}});
		}]);
		internalApp.directive("viewContactPage",[contactus]);
		function contactus()
		{
			return {
				restrict: "A",
				scope: {},
				templateUrl: "/app/internal/views/contactUs/partial.html",
				controller: ['$scope',
					function($scope)
					{
						angular.noop();
					}
				]
			};
		}
	   
})();
