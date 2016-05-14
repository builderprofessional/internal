(function()
{
	  internalApp.config(['engStateProvider', function (state)
		{
			state.add({view: 'viewOurStory', title: "Our Story", url: '/ourstory', role: 'ROLE_ALL', menus: {'about': 2}});
		}]);
		internalApp.directive("viewOurStory",[ourstory]);
		function ourstory()
		{
			return {
				restrict: "A",
				scope: {},
				templateUrl: "/app/internal/views/ourstory/partial.html",
				controller: ['$scope',
					function($scope)
					{
						angular.noop();
					}
				]
			};
		}
	   
})();
