
module.exports = function($rootScope, $q, jwtHelper){

	var token = localStorage.getItem('id_token');

	$rootScope.userIsAuthenticated = false;

	this.setAuth = function(token, userId){
		$rootScope.userIsAuthenticated = true;
		$rootScope.userPrivilege = jwtHelper.decodeToken(token).privilege;
		$rootScope.userId = userId;
	};

	this.isAuth = function(){
		return $rootScope.userIsAuthenticated;
	};

	this.getUserData = function(token){
		return jwtHelper.decodeToken(localStorage.getItem('id_token'));
	};

	this.disconnect = function(){
		$rootScope.userIsAuthenticated = false;
		$rootScope.$broadcast('logout');
		localStorage.removeItem('id_token');
	};

	return this;

};