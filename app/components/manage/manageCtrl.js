module.exports = function($scope, $location, $resource, configService){

	var engines = $resource(configService.API + '/engines');
	var slipcovers = $resource(configService.API + '/slipcovers');

	$scope.goNext = function (hash) { 
		$location.path(hash);
	}

	slipcovers.query(function(result){
		$scope.slipcovers = result;
	});

	engines.query(function(result){
		$scope.engines = result;
	});


};