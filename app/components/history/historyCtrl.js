
module.exports = function($scope, $resource, configService, ngTableParams, $filter, $modal, toaster){

	var request = $resource(configService.API + '/request');
	
	$scope.tableParams  = new ngTableParams({
		page: 1,
		count: configService.COUNT,
		sorting: {
			date : 'desc'
		}
	}, {
		getData: function ($defer, params) {
			request.query(function(data){
				var searchedData = searchData(data);
				params.total(searchedData.length);
				$scope.patients = searchedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
				$defer.resolve($scope.patients); 
			});
		},
		$scope: { $data: {} }
	});

	$scope.$watch("searchText", function () {
		$scope.tableParams.reload();
	});

	var searchData = function(usersData){
		if($scope.searchText)
			return $filter('filter')(usersData,$scope.searchText);
		return usersData;		
	}

	$scope.tableParams.settings().$scope = $scope;

	$scope.expend = function(item, index){
		var Instance = $modal.open({
			animation: true,
			templateUrl: 'app/templates/history/expend.html',
			controller: require('../../templates/history/Controller.js'),
			resolve: {
				data: function(){
					return item;
				}
			}
		});

		Instance.result.then(function(value){}, function(value){
			if(value){
				$scope.tableParams.data.splice(index, 1);
			}
		});
	}

	 $scope.stop = function(e){
        e.stopPropagation();
    }

    $scope.save = function(d, r){
    	console.log(d)
    }


};