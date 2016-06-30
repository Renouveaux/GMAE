module.exports = function($scope, configService, $resource, $http, highchartsNG){

	var getRateYear = $resource(configService.API + '/statistics/rate');
	var getStatsYear = $resource(configService.API + '/statistics/request');

	$scope.year = ""+new Date().getFullYear()-1+"";
	var dayByYear = "";


	var load = {
		getStatsYear: function(year){
			var y = (year === undefined) ? $scope.year : year;
			dayByYear = new Date(y,1,1).getMonth() == new Date(y,1,29).getMonth() ? 366 : 365;
			getStatsYear.query({year: y}, function(d){

				var askByMonth 		= $scope.askByMonth.getHighcharts();

				$scope.askByMonth.series[0]["data"] = d[0]["data"];
				$scope.askByMonth.series[1]["data"] = d[1]["data"];
				$scope.askByMonth.series[2]["data"] = d[2]["data"];

				askByMonth.redraw();

			});
		},
		getRateYear: function(year){
			var y = (year === undefined) ? $scope.year : year;
			dayByYear = new Date(y,1,1).getMonth() == new Date(y,1,29).getMonth() ? 335 : 334;
			getRateYear.query({year: y}, function(d){
				var rateByYear = $scope.rateByYear.getHighcharts();

				var average = 0;
				var enginesLength = 0;

				angular.forEach(d[0], function(v, i, a){
					enginesLength++;
					average = average + v.total;
					$scope.rateByYear.series[0]["data"].push(Math.round((v.total / dayByYear ) * 100) )
					$scope.rateByYear.xAxis["categories"].push(v.label)
				})
				$scope.rateByYear.yAxis.plotLines[0].value = Math.round((average / dayByYear ) * 100) / enginesLength;
				rateByYear.redraw();
			})


		},
		all: function(){
			this.getStatsYear();
			this.getRateYear();
		}
	}

	load.all();

	$scope.getYear = function(year){
		load.getStatsYear(year);
		//load.getRateYear(year)
	}

	/**
	 * Get number of request by month for a year and show if they are rented or not
	 * @type Chart
	 */
	 $scope.askByMonth = {
	 	title: {
	 		text: ''
	 	},
	 	options: {
	 		chart: {
	 			type: 'column',
	 			height: 350
	 		},
	 		plotOptions: {
	 			column: {
	 				stacking: 'normal',
	 				dataLabels: {
	 					enabled: true,
	 					color: 'white',
	 					style: {
	 						textShadow: '0 0 3px black'
	 					}
	 				}
	 			},
	 			spline: {
	 				dataLabels: {
	 					enabled: true,
	 					color: '#333333'
	 				}
	 			}
	 		},
	 		legend: {
	 			align: 'right',
	 			x: -30,
	 			verticalAlign: 'top',
	 			y: 25,
	 			floating: false,
	 			backgroundColor: 'white',
	 			borderColor: '#CCC',
	 			borderWidth: 1,
	 			shadow: false
	 		}
	 	},
	 	series: [{
	 		type: 'spline',
	 		name: 'Total',
	 		data: []
	 	},{
	 		name: 'HDPMB',
	 		data: [],
	 		color: 'rgba(165,170,217,1)',
	 		enableMouseTracking: false
	 	},{
	 		name: 'Location',
	 		data: [],
	 		color: 'rgba(126,86,134,.9)',
	 		enableMouseTracking: false
	 	}],				
	 	credits: {
	 		enabled: false
	 	},
	 	yAxis: {
	 		title: "",
	 	},
	 	xAxis: {
	 		categories: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec']
	 	},
	 	loading: false
	 }



	 $scope.rateByYear = {
	 	title: {
	 		text: ''
	 	},
	 	options: {
	 		chart: {
	 			type: 'column'
	 		},
	 		plotOptions: {
	 			column: {
	 				stacking: 'normal',
	 				dataLabels: {
	 					enabled: true,
	 					color: 'white',
	 					style: {
	 						textShadow: '0 0 3px black'
	 					}
	 				}
	 			}
	 		},
	 		legend: {
	 			enabled: false
	 		}
	 	},
	 	series: [{
	 		name: 'HDPMB',
	 		data: [],
	 		color: 'rgba(165,170,217,1)',
	 		enableMouseTracking: false
	 	}],				
	 	credits: {
	 		enabled: false
	 	},
	 	yAxis: {
	 		labels: {
	 			formatter: function() {
	 				return this.value + ' %';
	 			}
	 		},
	 		title: "Hello",
	 		min: 0,
	 		max: 100,
	 		plotLines: [{
	 			color: 'red',
	 			value: 0,
	 			width: 2
	 		}]
	 	},
	 	xAxis: {
	 		categories: []
	 	},
	 	loading: false
	 }




	 Highcharts.chart('allotment', {


	 	chart: {
	 		plotBackgroundColor: null,
	 		plotBorderWidth: null,
	 		plotShadow: false,
	 		type: 'pie'
	 	},
	 	title: {
	 		text: ''
	 	},
	 	tooltip: {
	 		pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	 	},
	 	plotOptions: {
	 		pie: {
	 			allowPointSelect: true,
	 			cursor: 'pointer',
	 			dataLabels: {
	 				enabled: true,
	 				format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	 				style: {
	 					color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
	 				}
	 			}
	 		}
	 	},
	 	series: [{
	 		name: 'Taux',
	 		colorByPoint: true,
	 		data: [{
	 			name: 'Médecine A',
	 			y: 56
	 		}, {
	 			name: 'Médecine B',
	 			y: 24,
	 			sliced: true,
	 			selected: true
	 		}, {
	 			name: 'Médecine C',
	 			y: 10
	 		}, {
	 			name: 'Médecine D',
	 			y: 4
	 		}, {
	 			name: 'Chirurgie A',
	 			y: 4
	 		}, {
	 			name: 'Chirurgie B',
	 			y: 2
	 		}]
	 	}]
	 });


	 Highcharts.chart('byDayAndServices', {

	 	chart: {
	 		type: 'column'
	 	},

	 	title: {
	 		text: 'Besoin des matelas en jours et par service'
	 	},

	 	xAxis: {
	 		categories: ['services']
	 	},

	 	yAxis: {
	 		title: "",
	 		min: 0,
	 		stackLabels: {
	 			enabled: true,
	 			style: {
	 				fontWeight: 'bold',
	 				color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	 			}
	 		}
	 	},

	 	legend: {
	 		align: 'right',
	 		x: -30,
	 		verticalAlign: 'top',
	 		y: 25,
	 		floating: true,
	 		backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	 		borderColor: '#CCC',
	 		borderWidth: 1,
	 		shadow: false
	 	},

	 	plotOptions: {
	 		column: {
	 			stacking: 'normal',
	 			dataLabels: {
	 				enabled: true,
	 				color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	 				style: {
	 					textShadow: '0 0 3px black'
	 				}
	 			}
	 		},line: {
	 			dataLabels: {
	 				enabled: true,
	 				color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	 				style: {
	 					textShadow: '0 0 3px black'
	 				}
	 			},
	 			enableMouseTracking: true
	 		}
	 	},

	 	series: [{
	 		name: 'HDPMB',
	 		data: [24, 20, 35, 50, 21, 47]
	 	},{
	 		name: 'Location',
	 		data: [28, 48, 40, 19, 86, 27]
	 	}, {
	 		type: 'spline',
	 		name: 'Total',
	 		data: [93, 107, 120, 100, 142, 82],
	 		marker: {
	 			lineWidth: 2,
	 			lineColor: Highcharts.getOptions().colors[3],
	 			fillColor: 'white'
	 		}
	 	}]
	 });





	 Highcharts.chart('annuelUseEngine', {
	 	chart: {
	 		type: 'column'
	 	},
	 	title: {
	 		text: 'Taux d\'utilisation annuel par matelas'
	 	},

	 	xAxis: {
	 		type: 'category',
	 		labels: {
	 			rotation: -45,
	 			style: {
	 				fontSize: '13px',
	 				fontFamily: 'Verdana, sans-serif'
	 			}
	 		}
	 	},
	 	yAxis: {
	 		min: 0,
	 		max: 110
	 	},
	 	legend: {
	 		enabled: false
	 	},
	 	tooltip: {
	 		pointFormat: '<b>{point.y}</b> %'
	 	},
	 	series: [{
	 		name: 'Taux',
	 		data: [
	 		['1', 84],
	 		['2', 91],
	 		['3', 78],
	 		['4', 88],
	 		['5', 100],
	 		['6', 98],
	 		['7', 87],
	 		['8', 93],
	 		['9', 97],
	 		['A', 97],
	 		['B', 99],
	 		['C', 100],
	 		['D', 100],
	 		['E', 95],
	 		['F', 96]
	 		],
	 		dataLabels: {
	 			enabled: true,
	 			rotation: -90,
	 			color: '#FFFFFF',
	 			align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                	fontSize: '13px',
                	fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });


	}


	Highcharts.PlotLineOrBand.prototype.update = function (newOptions){
		var plotBand = this;
		Highcharts.extend(plotBand.options, newOptions);
		if (plotBand.svgElem) {
			plotBand.svgElem.destroy();
			plotBand.svgElem = undefined;
			plotBand.render();
		}
	}