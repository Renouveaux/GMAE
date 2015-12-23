module.exports = function() {
	return {
		restrict : 'A',
		templateUrl : './app/shared/footer/footerView.html',
		controller: function($scope, configService){
			$scope.appVersion = configService.APP_VERSION;
		}
	};
};