module.exports = function($scope, $resource, configService, sidenavService){

	$scope.menus = sidenavService.query();

};