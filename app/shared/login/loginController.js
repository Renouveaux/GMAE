
module.exports = function($scope, loginService, $resource, configService){

	var User = $resource(configService.API + '/login');

	$scope.loginData = {login : '', password: ''};	

	$scope.wrong = false;

	$scope.login = function(){

		var user = new User();
		user.login = $scope.loginData.login;
		user.password = $scope.loginData.password;

		user.$save(function(data){
			localStorage.setItem('id_token', data.token);
			loginService.setAuth(data.token, data._id);
			$scope.wrong = false;
		}, function(err){
			$scope.wrong = true;
			$scope.server_info = err.data.message;
		});

	};

	$scope.logout = function(){
		loginService.disconnect();
		$scope.wrong = false;
		$scope.loginData = {login : '', password: ''};	
	};

};
