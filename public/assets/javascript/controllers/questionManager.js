  $( function() {
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
  } );

	function removeIt(removeClass){
		var all = document.getElementsByClassName(removeClass);
		//it's all.lenght +1 because it keeps not working because the array get too short
		 for (var i = 0; i < all.length + 1; i++){
		 	all[0].remove()
		 }
	}
	function removeOption(removeClass){
		var removing = "option"+removeClass;
		debugger
		var all = document.getElementsByClassName(removing);
		 for (var i = 0; i < all.length; i++){
		 	all[i].remove()
		 }
	}
	var optionCount = 0
	function addOptions(id, type){
		optionCount++
		// data type and data name
		var input="<div class='col-md-offset-4 col-md-12 option" + optionCount + "'> <input placeholder='option' class='col-md-6' data-type='" + type +"' data-name='" + id +"'><button class='btn btn-xs col-md-2' onclick='removeOption(`"+ optionCount + "`)'> X </button></div>"
	angular.element(document.getElementById(id))
	.append(input)
}

app.controller('questionManager', function($state, $scope, $rootScope, $http) {

	$scope.save = function() {
		$http({
			method: "POST",
			url: "/newSurvey",
			data:{"name":$scope.name}
		}).then(function successCallback(response) {
			$state.go("share")
			var inputs = document.getElementsByTagName('input')
			for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].dataset.type === "input") {
					createQuestion(inputs[i].dataset.type, null, inputs[i].value, null)
					console.log("this is an input, the value is" + inputs[i].value)
				} else if (inputs[i].dataset.type === "textarea") {
					for (var j = 0; j < inputs.length; j++) {
						if ((inputs[i].dataset.name === inputs[j].dataset.name) && (inputs[j].dataset.type === "lines")) {
							createQuestion(inputs[i].dataset.type, inputs[j].value, inputs[i].value, null)
						}
					}

				} else if ((inputs[i].dataset.type === "radio") || (inputs[i].dataset.type === "checkbox")) {
					var optionsArray = []
					var k = 0
					for (var j = 0; j < inputs.length; j++) {
						k++
						if ((inputs[i].dataset.name === inputs[j].dataset.name) && (inputs[j].dataset.type === "options")) {
							optionsArray.push(inputs[j].value)
						}
					}
					//when loop is done, can now send data to be stored
					if (k === inputs.length) {
						createQuestion(inputs[i].dataset.type, null, inputs[i].value, optionsArray)
					}
				}
			}
		}, function errorCallback(response) {

		});
	}
$scope.count = 0

	$scope.inputCreator = function(type) {
				$scope.count++
		var panelStart =  "<li draggable='true' ondragenter='dragenter(event)' ondragstart='dragstart(event)'><div class='createPanel col-md-8 "+ $scope.count + " panel panel-info'><div class='createPanelBody panel-body'>"
		var panelEnd = "</div> </div></li>"

			if (type === "input") {
				var input = panelStart 
				+"<h4 class='customH4 col-md-4'>what is your question</h4><input class='customInput col-md-8' data-type='input' data-name='" 
				+ $scope.count + "'>" 
			 + panelEnd 	+ "<button class='btn btn-lg btn-primary col-md-4 "+  $scope.count +"' onclick='removeIt(`"+ $scope.count +"`)'> Delete This Input </button>"
				angular.element(document.getElementById('sortable'))
					.append(input)
			} 
			else
		if (type === "textarea") {
			var input = panelStart
			+"<h4 class='customH4 col-md-4'>what is your question</h4><input class='customInput col-md-8' data-type='textarea' data-name='"
			+$scope.count + "'><br><h4 class='col-md-4'>how many lines</h4><input class='customInput col-md-8' data-type='lines' data-name='" 
			+$scope.count + "'>" 
			+ panelEnd 	+ "<button class='btn btn-lg btn-primary col-md-4 "+  $scope.count +"' onclick='removeIt(`"+ $scope.count +"`)'> Delete This Textarea </button>"
			angular.element(document.getElementById('sortable'))
				.append(input)
		} else if (type === "checkbox") {
			var input = panelStart 
			+"<h4 class='customH4 col-md-4'>what is your question</h4><input class='customInput col-md-8' data-type='checkbox' data-name='" 
			+$scope.count + "'>"
			
			+"<button class='btn btn-default btn-sm col-md-4' onclick='addOptions(" + $scope.count +  ",`options`)'> Add Options </button>" 
			+"<div class='col-md-8 col-md-offset-4' id ='" + $scope.count + "'></div>" 
			+ panelEnd 	+ "<button class='btn btn-lg btn-primary col-md-4 "+  $scope.count +"' onclick='removeIt(`"+ $scope.count +"`)'> Delete This Checkbox</button>"
			var el = angular.element(input);
			angular.element(document.getElementById('sortable'))
				.append(el)
		}
		else if (type ==="radio"){
				var input = panelStart 
				+ "<h4 class='customH4 col-md-4'>what is your question</h4><input class='customInput col-md-8' data-type='radio' data-name='" +
				$scope.count + "'>"
				
			  +"<button class='btn btn-default btn-sm col-md-4' onclick='addOptions(" + $scope.count +  ",`options`)'> Add Options </button>" 
				+"<div class='col-md-8 col-md-offset-4' id ='" + $scope.count + "'></div>" 
				+ panelEnd 	+ "<button class='btn btn-lg btn-primary col-md-4 "+  $scope.count +"' onclick='removeIt(`"+ $scope.count +"`)'> Delete This Radio </button>"
			var el = angular.element(input);
			angular.element(document.getElementById('sortable'))
				.append(el)
		}

	}
	$scope.shareSurvey=function(){
		$http({
				method: "GET",
				url: "/shareSurvey",
			}).then(function successCallback(response) {
				
				if (response.data.local === "true"){
					//this is local
					$scope.msg = "localhost:8080/viewSurvey/" + response.data.surveyId
				}
				else {
					//for production
					$scope.msg = "https://secretsurvey.herokuapp.com/viewSurvey/" + response.data.surveyId
				}
		
			})
	}

	$scope.view=function(){
		$state.go("previewSurvey")
	}

	$scope.inputType=function(input){
		$scope.selectedInput = input
		console.log(input)
	}
	$scope.options = []
	$scope.addOption = function(){
		var test ={"text":"option here"}
		$scope.options.push(test)
		console.log($scope.options)

	}

	function createQuestion(type, lines, text, options){
		
		$http({
				method: "POST",
				url: "/createQuestion",
				data: {
					"type": type,
					"lines": lines,
					"text": text,
					"options": options
				}
			}).then(function successCallback(response) {


			}, function errorCallback(reponse) {

			});

	}
	$scope.createQuestion = function() {
		function questionCreateFunction() {
			$http({
				method: "POST",
				url: "/createQuestion",
				data: {
					"type": $scope.selectedInput,
					"lines": $scope.lines,
					"text": $scope.text,
					"options": $scope.optionsArray
				}
			}).then(function successCallback(response) {


			}, function errorCallback(reponse) {

			});
		}
		console.log('create')
		$scope.optionsArray = [];
		if (($scope.selectedInput == "radio") || ($scope.selectedInput == "checkbox")) {
			var inputs = document.getElementsByClassName('optionInput');
			var l = inputs.length
			for (i = 0; i < l; i++) {
				var option = {
					"option": inputs[i].value
				}
				$scope.optionsArray.push(option)
				if ($scope.optionsArray.length === l) {
					//waits until all the values of the inputs are added to the array
					console.log("scope.options " + $scope.optionsArray)
					questionCreateFunction()
				}
			}
		} else if (($scope.selectedInput == "input") || ($scope.selectedInput == "textarea")) {
			questionCreateFunction()
		}
	}

}) //end of controller

