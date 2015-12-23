
module.exports = function($scope, $resource, configService, $modal, toaster, socketService, loginService){

	var Services = $resource(configService.API + '/services/:idService', null, { 'update': {method: 'PUT'} });
	var request = $resource(configService.API + '/request/:requestId', null, { 'update': {method: 'PUT'} });

	$scope.formData = {};
	$scope.step = 1;
	$scope.temp = {};
	$scope.patientData = {};
	$scope.currentServices = '';

	$scope.newData = function(){
		socketService.emit('public:updateData');
		console.log("newData");
	}

	$scope.refresh = function(){
		socketService.emit('refresh');
		console.log("refresh");
	}

	$scope.transfert = function(){
		socketService.emit('public:transfert');
		console.log("transfert");
	}

	$scope.nextStep = function() {
		$scope.step++;
	}

	$scope.prevStep = function() {
		$scope.step--;
	}

	$scope.submitForm = function() {
		var form = new request($scope.formData);		
		form.$save(function(data, err){
			forRefresh.waiting();
			$scope.formData = {};
			$scope.step = 1;
			$scope.temp = {};
			$scope.patientData = {};
			$scope.currentServices = '';
			toaster.pop('success', "Vos données ont étés sauvegardées");
			socketService.emit('public:updateData');
		}, function(err){
			toaster.pop('error', "Une erreure est survenue durant la sauvegarde, merci de réitérer vote demande", "Si le problème persiste, veuillez contacter un administrateur");
		});
	}

	$scope.combine = function(){
		$scope.formData.name = this.formPatient.name + ' ' + this.formPatient.lastname;
		$scope.formData.patientData = [$scope.patientData];
		$scope.formData.mail = $scope.temp.email;
	}

	$scope.selectService = function(idService){
		$scope.patientData = {
			services : this.currentServices			
		}
		Services.get({idService: this.currentServices}, function(service){
			$scope.temp = service;
		});
	}

	$scope.changeService = function(){
		if(this.showService == null){
			forRefresh.service();
			forRefresh.waiting();
		}else{
			forRefresh.service(this.showService);
			forRefresh.waiting(this.showService);
		}
	}

	$scope.onGoing = function (item) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: 'app/templates/dashboard/public/status.html',
			controller: require('../../templates/dashboard/public/Controller.js'),
			resolve: {
				data: function(){
					return item
				}
			}
		});
	};

	$scope.action = function (item) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: 'app/templates/dashboard/public/action.html',
			controller: require('../../templates/dashboard/public/Controller.js'),
			scope: $scope,
			resolve: {
				data: function(){
					return item
				}
			}
		});
		
		modalInstance.result.then(function(titre, message) {
			forRefresh.service();
			socketService.emit('public:updateData');
		});
	};

	socketService.on('processing', function(){
		$scope.services = Services.query();
		forRefresh.waiting();
		forRefresh.service();
	});

	socketService.on('refresh', function(){
		forRefresh.waiting();
		forRefresh.service();
	});

	var forRefresh = {
		waiting: function(serviceId){
			if(typeof serviceId == 'undefined'){
				serviceId = loginService.getUserData().service;
			}
			request.query({nexist:'dateEnd', state: '7,10,13,14', service: serviceId}, function(data){
				$scope.waiting = data;
			})
		},
		service: function(serviceId){
			if(typeof serviceId == 'undefined'){
				serviceId = loginService.getUserData().service;
			}
			request.query({state: '5,12', service: serviceId}, function(data){
				$scope.active = data;
			})
		}
	};


	$scope.services = Services.query();
	forRefresh.waiting();
	forRefresh.service();

};