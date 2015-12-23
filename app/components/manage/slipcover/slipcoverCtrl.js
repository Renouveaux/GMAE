module.exports = function($scope, $resource, configService, $filter){

	var slipcovers = $resource(configService.API + '/slipcovers/:idSlipcover', null, { 'update': {method: 'PUT'} });
	var states = $resource(configService.API + '/states/:idStates');
	var manufacturers = $resource(configService.API + '/manufacturers');
	var properties = $resource(configService.API + '/slipcovers/properties/:manufacturerId');

	states.query(function(output){
		$scope.states = $filter('filter')(output, {'filter': 'Housse'});
	});

	$scope.manufacturers = manufacturers.query();

	$scope.slipcovers = slipcovers.query();

	$scope.selectSlipcover = function(slipcoverId) {
		$scope.formSlipcover = true;

		var index;
		for (var i =0; i < $scope.filteredNew.length; i++){
			if($scope.slipcovers[i]._id === slipcoverId){
				index = i;
			}
		}

		$scope.selectedSlipcover = $scope.slipcovers[index];

		$scope.currentState = $scope.slipcovers[index].states._id;
		$scope.currentManufacturer = $scope.slipcovers[index].slipcoverProperties.manufacturers;
		$scope.currentProperties = $scope.slipcovers[index].slipcoverProperties._id;
		$scope.titre = "Gestion de la housse :";
		$scope.formType = "modify";

		$scope.getProperties($scope.currentManufacturer);

	};

	$scope.selectManufacturer = function(){
		$scope.selectedSlipcover.slipcoverProperties = {};
		$scope.selectedSlipcover.slipcoverProperties.manufacturers = $scope.currentManufacturer;
		$scope.getProperties($scope.currentManufacturer);
		$scope.currentProperties = {};
	};

	$scope.getProperties = function(manufacturer_id){
		$scope.slipcover_properties = properties.query({manufacturerId: $scope.currentManufacturer});
	};

	$scope.selectState = function(n){
		$scope.currentState = this.currentState;
		$scope.state = n;
	}

	$scope.modifySlipcover = function(id){
		slipcovers.update({idSlipcover:id}, {states: $scope.currentState}, function(){
			$scope.selectedSlipcover.states = $scope.state;
		});
	}

};