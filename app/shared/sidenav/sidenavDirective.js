module.exports = function(sidenavService) {
	return {
		restrict : 'A',
		templateUrl : './app/shared/sidenav/sidenavView.html',
		controller: require('./sidenavCtrl')
	};
};