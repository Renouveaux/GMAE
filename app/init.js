module.exports = function($rootScope, $state, loginService, jwtHelper){

	$rootScope.$on('$stateChangeStart', function (ev, toState) {

		var token = localStorage.getItem('id_token');

		if(token){
			if(!jwtHelper.isTokenExpired(token)){
				loginService.setAuth(token, jwtHelper.decodeToken(token)._id);
			}
		}else{
			loginService.disconnect();
		}


		if(token){
			if(jwtHelper.isTokenExpired(token)){
				loginService.disconnect();
			}
			
			var tokenPayload = jwtHelper.decodeToken(token);
			if(toState.data && toState.data.privilege && tokenPayload.privilege < toState.data.privilege){
				ev.preventDefault();
				$state.transitionTo('privilege');
			}
		}
	});

};