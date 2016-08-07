app.controller("navbar", function($scope, $http, $rootScope, $state){
	$rootScope.$on('$stateChangeSuccess', 
	function(event, toState, toParams, fromState, fromParams, options){ 
	$scope.$state = $state;
		if ($state.current.name === "index" || $state.current.name === "signUp" ){
			
		}
		else if ($rootScope.userAccount === undefined) {
			$http({
				method:"GET",
				url:"/userAccount",
			}).then(function successCallback(response){
				$rootScope.userAccount = response.data;

			});
		}
	})
});