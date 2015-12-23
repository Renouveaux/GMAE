
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
				var orderedRecentActivity = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
				params.total(orderedRecentActivity.length);
				$defer.resolve(orderedRecentActivity.slice((params.page() - 1) * params.count(), params.page() * params.count()));
			});
		}
	});


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

};