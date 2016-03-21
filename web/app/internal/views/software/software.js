(function()
{
	  internalApp.config(['engStateProvider', function (state)
		{
			state.add({view: 'engViewSoftware', title: "Software", url: '/software', role: 'ROLE_ALL', menus: {'main': 4}});
		}]);
		internalApp.directive("engViewSoftware",["$modal",software]);
		function software($modal)
		{
			return {
				restrict: "A",
				scope: {},
				templateUrl: "/app/internal/views/software/partial.html",
				controller: ['$scope',
					function($scope)
					{
            $scope.showLightbox = function (template,title)
            {
              $scope.modal = $modal(
                  {
                    contentTemplate: template,
                    show: true,
                    backdrop: true,
                    title:title,
                    animation: 'lightbox-fade',
                    backdropAnimation: 'lightbox-fade-bg',
                    id:'lightboxModal',
                    scope: $scope
                  });
            };
						$scope.signup = function(){
							document.location.href=env_url+"/purchase";
						};
					}
				]
			};
		}
	   
})();
