module.exports = function($scope, $modalInstance, data, $resource, configService, toaster, $modal, socketService){

	var Request = $resource(configService.API + '/request/:requestId', null, { 'update': {method: 'PUT'} });
	var Patient = $resource(configService.API + '/patients/transfer/:patientId', null, { 'update': {method: 'PUT'} });

	$scope.data = data;

	$scope.selectedTab = '1';
	$scope.transferData = {};

	$scope.selected = function (tabValue){
		$scope.selectedTab = tabValue;
	};

	$scope.newService = function(idService){
		$scope.transferData.services = this.newServices;
	};

	$scope.recovery = function(id){
		Request.update({requestId:id, state: '10', recoveryAsk: new Date()}, null, function(){			
			toaster.pop('success', "Votre demande de reprise à bien été enregistrée");
			$modalInstance.close(false);
			socketService.emit('updateRequest');
			socketService.emit('refresh');
		});
	};

	$scope.makeTransfer = function(info){
		Patient.update({patientId:data.patients._id}, info, function(result){
			$modalInstance.close(false);
			socketService.emit('public:transfert');
		});
	};

	$scope.cancel = function(){
		$modal.open({
			animation: true,
			templateUrl: 'app/templates/dashboard/public/confirm.html',
			controller: function($scope, $modalInstance){
				$scope.closeOnly = function () {
					$modalInstance.dismiss(true);
				};
				$scope.confirm = function(){		
					Request.update({requestId:data._id, state: '15'}, null, function(){			
						toaster.pop('success', "Annulation de votre demande enregistrée");
						$modalInstance.dismiss(true);
						close(true);
						socketService.emit('refresh');
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
