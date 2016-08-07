module.exports = function($scope, $uibModalInstance, $resource, configService, toaster, socketService){

	var Services = $resource(configService.API + '/services/:idService', null, { 'update': {method: 'PUT'} });
	var request = $resource(configService.API + '/request/:requestId', null, { 'update': {method: 'PUT'} });

	$scope.formData = {};
	$scope.step = 1;
	$scope.temp = {};
	$scope.patientData = {};
	$scope.currentServices = '';

	$scope.nextStep = function() {
		$scope.step++;
	}

	$scope.prevStep = function() {
		$scope.step--;
	}

	$scope.selectService = function(idService){
		$scope.patientData = {
			services : this.currentServices			
		}
		Services.get({idService: this.currentServices}, function(service){
			$scope.temp = service;
		});
	}

	$scope.combine = function(){
		$scope.formData.name = this.formPatient.name + ' ' + this.formPatient.lastname;
		$scope.formData.patientData = [$scope.patientData];
		$scope.formData.mail = $scope.temp.email;
	}

	$scope.submitForm = function() {
		var form = new request($scope.formData);		
		form.$save(function(data, err){
			$scope.formData = {};
			$scope.step = 1;
			$scope.temp = {};
			$scope.patientData = {};
			$scope.currentServices = '';
			toaster.pop('success', "Vos données ont étés sauvegardées");
			socketService.emit('public:updateData');
			$uibModalInstance.dismiss(true);
			close(true);
		}, function(err){
			toaster.pop('error', "Une erreure est survenue durant la sauvegarde, merci de réitérer vote demande", "Si le problème persiste, veuillez contacter un administrateur");
		});
	}

	function close(value){
		$uibModalInstance.dismiss(value);
	}

	$scope.close = function () {
		close(false);
	};

	$scope.services = Services.query();

}