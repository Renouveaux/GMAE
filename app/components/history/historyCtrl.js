
module.exports = function($scope, $resource, configService, ngTableParams, $filter, $uibModal, toaster){

	var Request = $resource(configService.API + '/request/:requestId', null, { 'update': {method: 'PUT'} });
	var Engines = $resource(configService.API + '/engines');

	$scope.engines = Engines.query();
	
	$scope.tableParams  = new ngTableParams({
		page: 1,
		count: configService.COUNT,
		sorting: {
			date : 'desc'
		}
	}, {
		getData: function ($defer, params) {
			Request.query(function(data){
				searchedData = $filter('filter')(data,$scope.searchText);
				searchedData = $filter('filter')(searchedData,$scope.showEngine);
				searchedData = params.sorting ? $filter('orderBy')(searchedData, params.orderBy()) : searchedData;
				$data = searchedData.slice((params.page() - 1) * params.count(), params.page() * params.count());
				
				params.total(searchedData.length);
				$defer.resolve($data);
			});
		}
	});	

	$scope.$watch("searchText", throttle(function (event) {
		$scope.tableParams.reload();
	}, 1500));

	$scope.changeEngine = function(){
		$scope.tableParams.reload();
	}

	$scope.expend = function(item, index){
		var Instance = $uibModal.open({
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

		var newDate = d.dateEnd.split('/');

		day = parseInt(newDate[0],10);
		month = parseInt(newDate[1],10);
		year = parseInt(newDate[2],10);

		var date = new Date(''+year+'-'+month+'-'+day+' 05:00').toISOString()

		Request.update({requestId:d._id}, {dateEnd: date}, function(data){
			$scope.tableParams.data.splice(r, 1);
		});

	}

	function throttle(func, interval) {
		var lastCall = 0;
		return function() {
			var now = Date.now();
			if (lastCall + interval < now) {
				lastCall = now;
				return func.apply(this, arguments);
			}
		};
	}


};