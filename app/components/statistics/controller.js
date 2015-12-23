module.exports = function($scope, configService){

	$scope.labels = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"];
	$scope.series = ['HDPMB', 'Location'];
	$scope.data = [
	[65, 59, 80, 81, 56, 55, 40, 50, 55, 45, 98, 42],
	[28, 48, 40, 19, 86, 27, 90, 56, 42, 23, 5, 25]
	];
	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};

	$scope.servicesLabels = ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Juil", "Aou", "Sep", "Oct", "Nov", "Dec"];
	$scope.servicesSeries = ["Med A", "Med B", "Med C", "Chir A", "Chir B", "Chir C", "Ped", "Urg", "UHCD"];
	$scope.servicesData = [
	[5, 20, 10, 54, 41, 21, 54, 32],
	[8, 45, 15, 54, 68, 62, 20, 87],
	[45, 54, 20, 51, 12, 35, 98, 45],
	[2, 56, 10, 24, 10, 11, 35, 45],
	[4, 35, 21 ,01, 24, 65, 12, 75],
	[32, 12, 45, 21, 65 ,23, 12, 45],
	[10, 25, 54 ,12 ,51, 32, 12, 02],
	[20, 32, 45, 12, 0, 2, 45, 65],
	[9, 14, 45, 18, 12 ,32 ,0 ,54]
	];


/*

$scope.options = {
  data: [...],
  dimensions: {},
  chart: {},
  state: {}
};

*/




}