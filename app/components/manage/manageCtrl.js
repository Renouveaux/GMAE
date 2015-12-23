module.exports = function($scope, $location){

	$scope.goNext = function (hash) { 
		$location.path(hash);
	}


};