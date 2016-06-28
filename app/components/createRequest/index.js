module.exports = function($scope, $resource, configService, $modal, toaster){

	var Services = $resource(configService.API + '/services/:idService', null, { 'update': {method: 'PUT'} });
	var Engines = $resource(configService.API + '/engines');

	$scope.currentServices = '';

	$scope.selectService = function(idService){
		$scope.patientData = {
			services : this.currentServices			
		}
		Services.get({idService: this.currentServices}, function(service){
			$scope.temp = service;
		});
	}

	$scope.services = Services.query();

	$scope.engines = Engines.query({state: '4, 6'})

}