module.exports = function($scope, $resource, configService, $filter, toaster){

	var engines = $resource(configService.API + '/engines/:idEngine', null, { 'update': {method: 'PUT'} });
	var states = $resource(configService.API + '/states');
	var manufacturers = $resource(configService.API + '/manufacturers');
	var properties = $resource(configService.API + '/engines/properties/:manufacturerId');

	states.query(function(output){
		$scope.states = $filter('filter')(output, {'filter': 'Engine'});
	});

	$scope.manufacturers = manufacturers.query();

	$scope.engines = engines.query();

	$scope.selectEngine = function(engineId) {
		$scope.formEngine = true;

		var index;
		for (var i =0; i < $scope.filteredNew.length; i++){
			if($scope.engines[i]._id === engineId){
				index = i;
			}
		}

		$scope.selectedEngine = $scope.engines[index];
		$scope.currentState = $scope.engines[index].states._id;
		$scope.currentManufacturer = $scope.engines[index].engineProperties.manufacturers._id;
		$scope.currentProperties = $scope.engines[index].engineProperties._id;
		$scope.titre = "Gestion du moteur :";
		$scope.formType = "modify";

		$scope.getProperties($scope.currentManufacturer);

	};

	$scope.selectManufacturer = function(){
		$scope.selectedEngine.engineProperties = {};
		$scope.selectedEngine.engineProperties.manufacturers = $scope.currentManufacturer;
		$scope.getProperties($scope.currentManufacturer);
		$scope.currentProperties = {};
	};

	$scope.getProperties = function(manufacturer_id){
		$scope.engine_properties = properties.query({manufacturerId: $scope.currentManufacturer});
	};

	$scope.selectState = function(n){
		$scope.currentState = this.currentState;
		$scope.state = n;
	}

	$scope.modifyEngine = function(id){
		engines.update({idEngine:id}, {states: $scope.currentState}, function(){
			$scope.selectedEngine.states = $scope.state;
			toaster.pop('success', "Mise à jour du moteur Ok");
		});
	}

};

