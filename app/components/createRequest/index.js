module.exports = function($scope, $resource, configService, toaster){

	var Services = $resource(configService.API + '/services/:idService', null, { 'update': {method: 'PUT'} });
	var Engines = $resource(configService.API + '/engines');
	var Slipcovers = $resource(configService.API + '/slipcovers');
	var Users = $resource(configService.API + '/users');
	var CreateRequest = $resource(configService.API + '/newRequest');

	$scope.currentServices = '';
	$scope.currentUser = '';

	$scope.selectService = function(idService){
		$scope.patient = {
			patientData : {
				services : this.currentServices
			}			
		}
		Services.get({idService: this.currentServices}, function(service){
			$scope.temp = service;
		});
	}

	$scope.selectUser = function(idUser){
		$scope.request = {
			users : this.currentUser			
		}
	}

	$scope.services = Services.query();
	$scope.users = Users.query();
	$scope.engines = Engines.query({state: '4, 5, 6, 9'});
	$scope.slipcovers = Slipcovers.query();

	$scope.selectEngine = function(activeEngine) {
		$scope.selectedEngine = activeEngine;
	};

	$scope.selectSlipcover = function(activeSlipcover) {
		$scope.selectedSlipcover = activeSlipcover;
	};


	$scope.submit = function(){

		var dateInT = this.request.dateIn.split('/');
		dayIn = parseInt(dateInT[0],10);	monthIn = parseInt(dateInT[1],10);	yearIn = parseInt(dateInT[2],10);
		var dateRIn = new Date(''+yearIn+'-'+monthIn+'-'+dayIn+' 05:00').toISOString()

		var dateEndT = this.request.dateEnd.split('/');
		dayEnd = parseInt(dateEndT[0],10);	monthEnd = parseInt(dateEndT[1],10);	yearEnd = parseInt(dateEndT[2],10);
		var dateREnd = new Date(''+yearEnd+'-'+monthEnd+'-'+dayEnd+' 05:00').toISOString()


		var Information = {
			patient : {
				civility : this.patient.civility,
				name: this.patient.name + ' ' + this.patient.lastname,
				patientData : {
					status : "active",
					room : this.patient.patientData.room,
					braden : 0,
					services : this.currentServices,
					date : dateRIn
				}
			},
			request : {
				users : this.currentUser,
				mail : this.temp.email,
				date : dateRIn,
				dateEnd : dateREnd,
				engines : this.selectedEngine._id,
				slipcovers : this.selectedSlipcover._id
			}
		}

		var form = new CreateRequest(Information);

		form.$save(function(data, err){
			$scope.formData = {};
			delete this.temp;
			delete this.patient;
			delete this.request;
			delete this.currentServices;
			delete this.currentUser;
			delete this.selectedEngine;
			delete this.selectedSlipcover;
			toaster.pop('success', "Vos données ont étés sauvegardées");
		}, function(err){
			toaster.pop('error', "Une erreure est survenue durant la sauvegarde, merci de réitérer vote demande", "Si le problème persiste, veuillez contacter un administrateur");
		});

	}

}