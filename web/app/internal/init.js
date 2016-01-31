// define our angular app that encompasses all of our pages and inject all
// module dependencies
internalApp = angular.module('InternalApp', ['engApp', 'engAuth', 'ngAnimate', 'engState', 'mgcrea.ngStrap', 'LocalStorageModule']);
engApp.constant('APP_CONFIG',{
  App: {
    Name: "Builder Professional Internal"
  }
});
//configure routing defaults
internalApp.config(function ($locationProvider, $urlRouterProvider, $httpProvider)
{
    $httpProvider.defaults.headers.common['Cache-Control'] = 'no-cache';
    $urlRouterProvider.otherwise('/dashboard');

    // this will allow us to communicate cross domain
    $httpProvider.defaults.useXDomain = true;
    $locationProvider.html5Mode(false);
});


//configure datepicker defaults
internalApp.config(function($datepickerProvider) {
  angular.extend($datepickerProvider.defaults, {
    dateFormat: 'MM/dd/yyyy',
    startWeek: 1,
    autoclose: true
  });
});

//configure modal/aside defaults
internalApp.config(function($asideProvider){
  angular.extend($asideProvider.defaults,
     {
       template: '/app/engine/engApp/components/elements/aside/eng-aside.html',
       show: true
     }
  );
});

//bootstrap the app when the page is done loading
angular.element(document).ready(function ()
{
    angular.bootstrap(document.body, ['InternalApp']);
});
