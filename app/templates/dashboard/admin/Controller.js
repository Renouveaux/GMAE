module.exports = function($scope, $uibModalInstance, data, $resource, configService, Upload, $filter, toaster, socketService){

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
		Request.update({requestId:data._id}, {state: '5', value: $scope.modalAssignInfo}, function(data){
			$uibModalInstance.close();
		});
	}

	// Note si le fournisseur à bien livré le materiel dans le service.
	$scope.saveDelivery = function(){
		Hire.update({hireId:data.hire._id, state: '12'}, {value: $scope.formData.hire, request: data._id}, function(data){
			$uibModalInstance.close();
		});
	}

	$scope.saveRecovery = function(){
		var stateRequest = data.hire == null ? '0' : '14';

		if(stateRequest == '0'){
			Slipcovers.update({idSlipcover:data.slipcovers._id}, {states: this.slipcover_state_id});
			Engines.update({idEngine:data.engines._id}, {states: '4'});
			Request.update({requestId:data._id}, {state: stateRequest, dateEnd: new Date}, function(data){
				$uibModalInstance.close();
			});
		}else{
			Hire.update({hireId:data.hire._id, state: stateRequest, mail: true, template: 'stop', subject: 'Arrêt de location'}, {value: {dateEnd: Date.now()}, information: data, request: data._id}, function(data){
				$uibModalInstance.close();
			});
		}
	}

	$scope.saveRecovered = function(){
		Hire.update({hireId:data.hire._id, state: "0", mail: false}, {value: $scope.recover.hire, request: data._id}, function(data){
			$uibModalInstance.close();
		});
	}

	$scope.verify = function(file){
		file.upload = Upload.upload({
			url: configService.API + '/hire',
			method: 'PUT',
			data: {file: file, data : JSON.stringify($scope.modalAssignInfo)}
		}).success(function(data, status, headers, config) {
			$uibModalInstance.close(false);
			toaster.pop('success', "Information", "Informations enregistrées, mail envoyé");
		}).error(function(err) {
			toaster.pop('error', "Information", "Une erreur est survenue, merci de recommencer");
		});

	};

	$scope.deleteFile = function(){
		swal({
			title: "Alerte de suppression",
			text: "Attention, cette action est irreversible",
			type: "warning",
			showCancelButton: true,
			confirmButtonColor: "#DD6B55",confirmButtonText: "Supprimer",
			cancelButtonText: "Annuler",
			closeOnConfirm: false,
			closeOnCancel: false }, 
			function(isConfirm){ 
				if (isConfirm) {
					Request.delete({requestId: data._id}).$promise.then(function(data){
						swal("Confirmation!", "La suppression de la demande à bien été prise en compte", "success");
						socketService.emit('public:updateData');
						$scope.close();
					}, function(err){
						swal("Erreur", "Votre requete à générée une erreur", "Si le problème persiste, veuillez contacter un administrateur | code de l'erreur : " + err.status, "error")
					});
				} else {
					swal("Annulation", "La demande n'a pas été annulée", "error");
				}
			});
	}

	function close(value){
		$uibModalInstance.dismiss(value);
	}

	$scope.close = function () {
		close(false);
	};


};