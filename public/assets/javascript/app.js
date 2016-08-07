var app = angular.module('app', ["ui.bootstrap",'ngAnimate', 'ui.router', "ngCookies"]);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/index')
 $stateProvider
  // HOME STATES AND NESTED VIEWS ========================================
    .state('index', {
      url: '/index',
      templateUrl: '../views/index.html'
    })
    .state('signUp', {
      url: '/signUp',
      templateUrl: '../views/signUp.html'
    })
   .state('loggedIn', {
      url: '/loggedIn',
      templateUrl: '../views/loggedIn.html'
    })
      .state('myProfile', {
      url: '/myProfile',
      templateUrl: '../views/myProfile.html'
    })
   .state('test', {
      url: '/test',
      templateUrl: '../views/test.html'
    })
})

