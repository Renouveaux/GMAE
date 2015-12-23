module.exports = function($scope, $modalInstance, data, $resource, configService, Upload, $filter, toaster, $modal, socketService){

	var properties = $resource(configService.API + '/engines/properties');
	var Engines = $resource(configService.API + '/engines/:idEngine', null, { 'update': {method: 'PUT'} });
	var Slipcovers = $resource(configService.API + '/slipcovers/:idSlipcover', null, { 'update': {method: 'PUT'} });
	var Request = $resource(configService.API + '/request/:requestId', null, { 'update': {method: 'PUT'} });
	var Hire = $resource(configService.API + '/hire/:hireId', null, { 'update': {method: 'PUT'} });
	var Renters = $resource(configService.API + '/renters');
	var States = $resource(configService.API + '/states');

	$scope.data = data;
	delete $scope.data.tes;

	$scope.today = Date.now();

	// Disable weekend selection
	/*$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 ) );
	};*/

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.opened = true;
	};

	$scope.dateOptions = {
		formatYear: 'yy',
		startingDay: 1
	};

	$scope.format = 'dd.MM.yyyy';

	$scope.modalAssignInfo = {
		request: data._id,
		mail: (data.mail === data.users.email) ? data.mail : data.mail + ',' + data.users.email,
		patient: data.patients
	};

	$scope.properties = properties.query(function(result){
		return result;
	});

	$scope.renterList = Renters.query(function(result){
		return result;
	});

	States.query(function(output){
		$scope.states = $filter('filter')(output, {'filter': 'Housse'});
		angular.forEach(output, function(_state, key){
			if(_state.value == 11){
				$scope.slipcover_state_id = _state._id;
			}
		});
	});

	$scope.getList = function(manufacturerId){
		Engines.query({manufacturer:manufacturerId, state: '4'}, function(data){
			$scope.engineList = data;
			$scope.engineCount = data.length;
		});
		Slipcovers.query({manufacturer:manufacturerId, state: '4'}, function(data){
			$scope.slipcoverList = data;
			$scope.slipcoverCount = data.length;
		});
	}

	$scope.saveAssign = function(){
		Request.update({requestId:data._id, state: '5'}, {value: $scope.modalAssignInfo}, function(data){
			$modalInstance.close();
		});
	}

	// Note si le fournisseur à bien livré le materiel dans le service.
	$scope.saveDelivery = function(){
		Hire.update({hireId:data.hire._id, state: '12'}, {value: $scope.formData.hire, request: data._id}, function(data){
			$modalInstance.close();
		});
	}

	$scope.saveRecovery = function(){
		var stateRequest = data.hire == null ? '0' : '14';

		if(stateRequest == '0'){
			Slipcovers.update({idSlipcover:data.slipcovers._id}, {states: this.slipcover_state_id});
			Engines.update({idEngine:data.engines._id}, {states: '4'});
			Request.update({requestId:data._id, state: stateRequest}, null, function(data){
				$modalInstance.close();
			});
		}else{
			Hire.update({hireId:data.hire._id, state: stateRequest, mail: true, template: 'stop', subject: 'Arrêt de location'}, {value: {dateEnd: Date.now()}, information: data, request: data._id}, function(data){
				$modalInstance.close();
			});
		}
	}

	$scope.saveRecovered = function(){
		Hire.update({hireId:data.hire._id, state: "0", mail: false}, {value: $scope.recover.hire, request: data._id}, function(data){
			$modalInstance.close();
		});
	}

	$scope.verify = function(file){
		file.upload = Upload.upload({
			url: configService.API + '/hire',
			method: 'PUT',
			data: {file: file, data : JSON.stringify($scope.modalAssignInfo)}
		}).success(function(data, status, headers, config) {
			$modalInstance.close(false);
			toaster.pop('success', "Information", "Informations enregistrées, mail envoyé");
		}).error(function(err) {
			toaster.pop('error', "Information", "Une erreur est survenue, merci de recommencer");
		});

	};

	$scope.deleteFile = function(){
		var confirmation = $modal.open({
			animation: true,
			templateUrl: 'app/templates/confirm.html',
			controller: function($scope, $modalInstance){
				$scope.closeOnly = function () {
					$modalInstance.dismiss(true);
				};
				$scope.confirm = function(){				
					Request.delete({requestId: data._id}).$promise.then(function(data){
						toaster.pop('success', "La suppression de ressource à bien été prise en compte");
						$modalInstance.dismiss(true);
						close(true);
						socketService.emit('public:updateData');
					}, function(err){
						toaster.pop('error', "Votre requete à générée une erreur", "Si le problème persiste, veuillez contacter un administrateur | code de l'erreur : " + err.status);
						$modalInstance.dismiss(true);
					});
				};
			}
		});
	}

	function close(value){
		$modalInstance.dismiss(value);
	}

	$scope.close = function () {
		close(false);
	};


};