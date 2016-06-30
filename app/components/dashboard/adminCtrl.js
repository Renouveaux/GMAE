module.exports = function($scope, $resource, configService, $uibModal, $filter, toaster, socketService){

	var request = $resource(configService.API + '/request');
	var engines = $resource(configService.API + '/engines');
	var slipcovers = $resource(configService.API + '/slipcovers');

	socketService.on('refresh', function(){
		load.all();
		//toaster.pop('info', "Nouvelles données");
	});

	socketService.on('updateRequest', function(){
		load.important();
		//toaster.pop('info', "Nouvelles données");
	});

	socketService.on('updateEngine', function(){
		load.engines();		
		//toaster.pop('info', "Nouvelles données");
	});

	var load = {
		important: function(){
			request.query({state: '7,10,12,13,14'}, function(data){
				$scope.important = data;				
			});
		},
		engines: function(){
			engines.query({state: '4, 6'}, function(free){
				request.query({state: '5', filter: 'modena'}, function(data){
					$scope.modena = angular.copy(free.concat(data));
					angular.forEach($scope.modena, function (d) {
						if(typeof d.label !== 'undefined'){
							d.label = parseFloat(d.label);						
						}else{
							d.label = parseFloat(d.engines.label)
						}
					});
				});

				request.query({state: '5', filter: 'nimbus'}, function(data){
					$scope.nimbus = angular.copy(free.concat(data));
					angular.forEach($scope.nimbus, function (d) {
						if(typeof d.label !== 'undefined'){
							d.label = d.label;						
						}else{
							d.label = d.engines.label
						}
					});
				});
			});
		},
		slipcovers: function(){
			slipcovers.query(function(result){
				$scope.slipcovers = result;
			});
		},
		all: function(){
			//this.modena();
			//this.nimbus();
			this.important();
			this.engines();
			this.slipcovers();
		}
	}

	load.all();

	$scope.untreat = function (item) {

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'app/templates/dashboard/admin/untreat.html',
			controller: require('../../templates/dashboard/admin/Controller.js'),
			resolve: {
				data: function(){
					return item
				}
			}
		});

		modalInstance.result.then(function() {
			load.all();
			socketService.emit('admin:processing');
		});

	};

	$scope.openInfo = function(item){
		if(typeof item.mail !== 'undefined'){			
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/templates/dashboard/admin/info.html',
				controller: require('../../templates/dashboard/admin/Controller.js'),
				resolve: {
					data: function(){
						return item
					}
				}
			});
		}
	}

	$scope.recovery = function(item){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'app/templates/dashboard/admin/recovery.html',
			controller: require('../../templates/dashboard/admin/Controller.js'),
			resolve: {
				data: function(){
					return item
				}
			}
		});

		modalInstance.result.then(function() {
			load.all();
			socketService.emit('admin:processing');
		});
	}

	$scope.delivery = function(item){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'app/templates/dashboard/admin/delivery.html',
			controller: require('../../templates/dashboard/admin/Controller.js'),
			resolve: {
				data: function(){
					return item
				}
			}
		});
		modalInstance.result.then(function() {
			load.important();
			socketService.emit('refresh');
		});
	}

	$scope.recovered = function(item){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'app/templates/dashboard/admin/recovered.html',
			controller: require('../../templates/dashboard/admin/Controller.js'),
			resolve: {
				data: function(){
					return item
				}
			}
		});
		modalInstance.result.then(function() {
			socketService.emit('refresh');
		});
	}

	$scope.createRequest = function(){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'app/templates/dashboard/admin/createRequest.html',
			controller: require('../../templates/dashboard/admin/createRequest.js')
		});
		modalInstance.result.then(function() {
			socketService.emit('refresh');
		});
	}

};
