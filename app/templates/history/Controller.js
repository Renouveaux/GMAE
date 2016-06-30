module.exports = function($scope, $uibModalInstance, data, $resource, configService){

	$scope.data = data;

	var request = $resource(configService.API + '/request/:idRequest');

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
					request.delete({idRequest: data._id}).$promise.then(function(data){
						swal("Confirmation!", "La suppression de la demande à bien été prise en compte", "success");
						close(true);
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

}