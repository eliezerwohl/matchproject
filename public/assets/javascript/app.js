var app = angular.module('app', ["ui.bootstrap",'ngAnimate', 'ui.router', "ngCookies"]);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/index')
 $stateProvider
  // HOME STATES AND NESTED VIEWS ========================================
    .state('index', {
      url: '/index',
      templateUrl: '../views/index.html'
    })
    .state('viewAllSurveys', {
      url: '/viewAllSurveys',
      templateUrl: '../views/viewAllSurveys.html'
    })
    .state('surveyThanks', {
      url: '/surveyThanks',
      templateUrl: '../views/surveyThanks.html'
    })
    .state('viewAllQuestions', {
      url: '/viewAllQuestions',
      templateUrl: '../views/viewAllQuestions.html'
    })
     .state('viewAnswersByQuestion', {
      url: '/viewAnswersByQuestion',
      templateUrl: '../views/viewAnswersByQuestion.html'
    })
    .state('previewSurvey', {
      url: '/previewSurvey',
      templateUrl: '../views/previewSurvey.html'
    })
     .state('deleteConfirm', {
      url: '/deleteConfirm',
      templateUrl: '../views/deleteConfirm.html'
    })
      .state('viewUserList', {
      url: '/viewUserList',
      templateUrl: '../views/viewUserList.html'
    })
    .state('signUp', {
      url: '/signUp',
      templateUrl: '../views/signUp.html'
    })
    .state('share', {
      url: '/share',
      templateUrl: '../views/share.html'
    })
     .state('viewByUser', {
      url: '/viewByUser',
      templateUrl: '../views/viewByUser.html'
    })
    .state('viewSurveyChoice', {
      url: '/viewSurveyChoice',
      templateUrl: '../views/viewSurveyChoice.html'
    })
    .state('loggedIn', {
      url: '/loggedIn',
      templateUrl: '../views/loggedIn.html'
    })
    .state('createSurvey', {
      url: '/createSurvey',
      templateUrl: '../views/createSurvey.html'
    })
      .state('test', {
      url: '/test',
      templateUrl: '../views/test.html'
    })

})

// app.controller('create', function($scope, $rootScope) {
// 	$scope.inputs = [];

// $scope.singleInput = function(){
// 	$scope.inputs.push({
// 		name: 'Question ',
//     model: ""

// 	})
// 	// document.getElementById("target").innerHTML = "";
// 	$rootScope.type = "single";
// 	// angular.element(document.getElementById("target"))
// 	// .append("<h2> put question here for single input</h2> <input ng-model='userInput'> ")
// }

// $scope.textArea = function(){
// 	// document.getElementById("target").innerHTML = "";
// 	$rootScope.type = "text";
// 	// angular.element(document.getElementById('target'))
// 	// .append("<h2> question for text area </h2> <input ng-model='userInput'>") 
// 		$scope.inputs.push({
// 		name: 'Question ',
//     model: ""
// 	},
// 	{
// 		name: 'Lines ',
//     model: ""
// 	}
// 	)
// }

// $scope.save = function(){
// 		if ($rootScope.type ==="text"){
// 		  $scope.saveIt = ("<h2>" + $scope.inputs[0].model + "</h2> <textarea  id='answer' rows='" + $scope.inputs[1].model + "''>");
// 	    angular.element(document.getElementById('target'))
// 		 .append($scope.saveIt) 
// 		}
// 		else if($rootScope.type ==="single"){
// 	   $scope.saveIt = ("<h2>" + $scope.inputs[0].model + "</h2> <input id='answer'>");
// 	   angular.element(document.getElementById('target'))
// 		.append($scope.saveIt) 
//   // document.getElementById("target").innerHTML = "";
//   	}

// }

// $scope.showSave = function(){
// var jah = document.getElementById("answer").value
// console.log(jah)

// }

// })