'use strict';

var app = angular.module('ChirperApp', ["firebase"]);

app.controller('ChirperCtrl', ['$scope', '$firebaseAuth', '$firebaseObject',function($scope, $firebaseAuth,$firebaseObject) {
	//your code goes here

	var Auth = $firebaseAuth();
	$scope.newUser = {};
	var baseRef = firebase.database().ref();
	var usersRef = baseRef.child('users'); //refers to "users" value

	$scope.signUp = function(){
		console.log($scope.newUser.handle);		
		console.log($scope.newUser.avatar);
	//create user
		Auth.$createUserWithEmailAndPassword($scope.newUser.email, $scope.newUser.password)
		.then(function(firebaseUser) {
		//display loginView
		$scope.userId = firebaseUser.uid;
		console.log('user created: '+firebaseUser.uid);
		var userData = {'handle':$scope.newUser.handle,'avatar': $scope.newUser.avatar };
		var newUserRef = usersRef.child(firebaseUser.uid);
		newUserRef.set(userData); //set the key's value to be the object you created
		})
		.catch(function(error) { //report any errors
		console.log(error);
		});

		$scope.users = $firebaseObject(usersRef);
		console.log($scope.users)
	}
	Auth.$onAuthStateChanged(function(firebaseUser) {
		if(firebaseUser){
			console.log('logged in');
			 $scope.userId =  firebaseUser.uid ;
		}
		else {
			console.log('logged out');
			 $scope.userId = undefined;
		}
		});

		$scope.signOut = function() {
			Auth.$signOut(); //AngularFire method
			};

			//respond to "Sign In" button
		$scope.signIn = function() {
			Auth.$signInWithEmailAndPassword($scope.newUser.email, $scope.newUser.password); //AngularFire method
			};

		
}]);


