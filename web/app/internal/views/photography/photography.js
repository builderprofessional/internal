(function()
{
	  internalApp.config(['engStateProvider', function (state)
		{
			state.add({view: 'engViewPhotography', title: "Photography", url: '/photography', role: 'ROLE_ALL', menus: {'main': 4}});
		}]);
		internalApp.directive("engViewPhotography",["$modal",photography]);
		function photography($modal)
		{
			return {
				restrict: "A",
				scope: {},
				templateUrl: "/app/internal/views/photography/partial.html",
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
