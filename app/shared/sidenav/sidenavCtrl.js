module.exports = function($scope, $location, sidenavService, socketService){	

	$scope.selected = function(tab){
		if(tab.selected){
			tab.selected = false;
		}else{
			angular.forEach($scope.tabs, function(r){
				r.selected = false;
			});
			tab.selected = true;
		}
	};

	var currentUrl = $location.url().split('/');

	loadMenu();

	function loadMenu(){
		$scope.tabs = sidenavService.query(function (response) {
			angular.forEach(response, function (item) {
				if (item.url == currentUrl[1]) {
					item.selected = true;
				}
			});
		});
	}

};