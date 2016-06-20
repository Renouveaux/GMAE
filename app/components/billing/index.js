module.exports = function($scope){


	$scope.periods = [
      {label:'Semaine dernière', value: 'lastWeek'},
      {label:'Semaine courante', value: 'thisWeek'},
      {label:'Mois dernier', value: 'lastMonth'},
      {label:'Mois courant', value: 'thisMonth'}
    ];

    $scope.period = $scope.periods[3]; // red

    $scope.filtrePeriod = function(){
    	// Catch the new $scope.period
    }


}