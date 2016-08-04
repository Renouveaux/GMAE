module.exports = function( $scope, socketService, loginService, $resource){

	$scope.init = function(){

		// did the user have seen the new release ?




	}

	socketService.on('connect', function(test){
		$scope.looseConnect = false;
	});

	socketService.on('disconnect', function(){
		$scope.looseConnect = true;
		$scope.socketInfo = "Deconnecté du serveur";
	});

	socketService.on('reconnecting', function(){
		$scope.looseConnect = true;
		$scope.socketInfo = "Reconnexion en cours";
	});

	socketService.on('reconnect_error', function(){
		$scope.looseConnect = true;
		$scope.socketInfo = "Erreur de reconnexion";
	});

};