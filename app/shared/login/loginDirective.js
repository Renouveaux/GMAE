module.exports = function() {
	return {
		restrict : 'A',
		templateUrl : './app/shared/login/loginView.html',
		controller: require('./loginController')
	};
};