angular
.module('mainApp', ['ngMaterial','directivelibrary', 'ui.router', 'ngAnimate'])

	.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/main/tabone');

	$stateProvider
	
	// HOME STATES AND NESTED VIEWS ========================================
   
	 .state('main', {
		url: '/main',
		templateUrl: 'partials/main.html'
	})
	
	.state('main.one', {
		url: '/tabone',
		templateUrl: 'partials/tabone.html',
		controller: 'ViewCtrl'
	})
	
	.state('main.two', {
		url: '/tabtwo',
		templateUrl: 'partials/tabtwo.html',
		controller: 'ViewCtrl'
	})
	
	.state('add', {
		url: '/add',
		templateUrl: 'partials/add.html',
		controller: 'AddCtrl'
	})
	
})

.controller('AppCtrl', function ($scope, $mdDialog, $location, $state, $timeout, $q) {

	
	  //This holds the UI logic for the collapse cards
	  $scope.toggles = {};
	  $scope.toggleOne = function($index){
	   for (ind in $scope.junkData)
		if ($scope.toggles[ind] && ind != $index)
		 $scope.toggles[ind] = false;

	   if (!$scope.toggles[$index])
		 $scope.toggles[$index] = true;
	   else $scope.toggles[$index] = !$scope.toggles[$index];
	 };

	 //Sample array
	 $scope.junkData = [
		{name:"Dilshan",age:"23"},
		{name:"Binara",age:"25"},
		{name:"Divani",age:"26"}];
	
	
	$scope.addInvoice = function(){
        location.href = '#/add';
	  }
	
	$scope.viewInvoice = function(){
        location.href = '#/main.one';
        
      }
		
		
})//END OF AppCtrl
   
   
.controller('AddCtrl', function ($scope, $mdDialog, $window) {

		
	$scope.template = {};
	
	$scope.submit = function(){
		$scope.submitted = true; // Disable the submit button until the form is submitted successfully to the database (ng-disabled)
					
		//submit infor to database
		console.log($scope.template);
		 /*
		 ---if submit request is successful---
			self.searchText = "";
			$scope.submitted = false; // Make submit button enabled again (ng-disabled)
			$scope.template = ""; // Empty the form
			$scope.editForm.$setUntouched();
			$scope.editForm.$setPristine();
		 */
		
	}
			
	
})//END OF AddCtrl

.controller('ViewCtrl', function ($scope,$state, $mdDialog ) {
	
	$scope.saveChanges = function(data){
					
		//submit changes to database
		console.log($scope.template);	
	}
	
})//END OF ViewCtrl







