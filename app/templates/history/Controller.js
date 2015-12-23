module.exports = function($scope, $modalInstance, data, $resource, configService, $filter, toaster, $modal){

	$scope.data = data;

	var request = $resource(configService.API + '/request/:idRequest');

	$scope.deleteFile = function(){
		var confirmation = $modal.open({
			animation: true,
			templateUrl: 'app/templates/confirm.html',
			controller: function($scope, $modalInstance){
				$scope.closeOnly = function () {
					$modalInstance.dismiss(true);
				};
				$scope.confirm = function(){				
					request.delete({idRequest: data._id}).$promise.then(function(data){
						toaster.pop('success', "La suppression de ressource à bien été prise en compte");
						$modalInstance.dismiss(true);
						close(true);
					}, function(err){
						if(err.status == 405){							
							toaster.pop('error', "Votre requete à générée une erreur", "Cette demande à déjà été traitée et ne peu être supprimée");
						}else{
							toaster.pop('error', "Votre requete à générée une erreur", "Si le problème persiste, veuillez contacter un administrateur | code de l'erreur : " + err.status);
						}
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

}