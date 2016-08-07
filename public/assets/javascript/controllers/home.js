app.controller("home", function($scope, $http, $rootScope, $state){



	$scope.demoButton= function(){
		$scope.username = "johnnyBGoode"
		$scope.password = "chuckberry"
		$scope.login()
	}
	$scope.goOlder = function(){
		$state.go("viewAllSurveys")
	}

	$scope.allSubmissions = function(){
		$state.go("viewAllSurveys")
	}
	$scope.navbar = function(){

		
		var test = document.getElementById('test');
		console.log(test)
		// $http({
		// 	method:"GET",
		// 	url:"/location"
		// }).then(function successCallback(response){
		// 	if (response.data != ""){
		// 		

		// 		$state.go("previewSurvey")
		// 	}
		// }, function errorCallback(response){
			
		// });

	}

	$scope.newSurvey=function(){
		$state.go("createSurvey")
	}

	$scope.login=function(){
		$http({
			method:"POST",
			url:"/login",
			data:{"username":$scope.username,
						"password":$scope.password}
		}).then(function successCallback(response){
			if (response.data == "error"){
				$scope.errorMsg="The information you entered is not correct.  Please try again";
			}
			else{
				$rootScope.userAccount = response.data; 
				
				$state.go("loggedIn");
			}
		}, function errorCallback(response){
	
			
		});
	}
	$scope.signUp =function(){
		
		$http({
			method:"POST",
			url:"/signUp",
			data:{"firstName":$scope.firstName, 
						"lastName":$scope.lastName, 
						"email":$scope.email,
						"password":$scope.password,
						"city":$scope.city,
						"account":$scope.account
							}
		}).then(function successCallback(response){
			if(response.data==="taken"){
				$scope.msg ="I'm sorry, that username is already taken.  Try another?"
			}
			else{
				
				$rootScope.msg="You've signed up, now sign in..."
				$state.go("index")
			}

		}, function errorCallback(reponse){
			

		});
	}
})//end of controller

