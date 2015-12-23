module.exports = function($httpProvider, $stateProvider, $urlRouterProvider, jwtInterceptorProvider){

	$urlRouterProvider.otherwise("/");

	$stateProvider.state('dashboard', {
		url: '/',
		views: {
			'': {
				templateUrl: 'app/components/dashboard/index.html'
			},
			'admin@dashboard': {
				templateUrl: 'app/components/dashboard/admin.html',
				controller: require('./components/dashboard/adminCtrl')
			},
			'public@dashboard': {
				templateUrl: 'app/components/dashboard/public.html',
				controller: require('./components/dashboard/publicCtrl')
			}
		}
	});

	$stateProvider.state('manage', {
		url: '/manage',
		templateUrl: "app/components/manage/index.html",
		controller: require('./components/manage/manageCtrl')
	});

	$stateProvider.state('engine', {
		url: '/manage/engine',
		templateUrl: "app/components/manage/engine/index.html",
		controller: require('./components/manage/engine/engineCtrl'),
		data: {
			privilege: 4
		}
	});

	$stateProvider.state('slipcover', {
		url: '/manage/slipcover',
		templateUrl: "app/components/manage/slipcover/index.html",
		controller: require('./components/manage/slipcover/slipcoverCtrl')
	});

	$stateProvider.state('feedback', {
		url: '/feedback',
		templateUrl: "app/components/feedback/feedbackView.html"
	});

	$stateProvider.state('history', {
		url: '/history',
		templateUrl: "app/components/history/historyView.html",
		controller: require('./components/history/historyCtrl')
	});

	$stateProvider.state('settings', {
		url: '/settings',
		templateUrl: "app/components/settings/settingsView.html",
		controller: 'settingsCtrl'
	});

	$stateProvider.state('user', {
		url: "/user",
		templateUrl: "partials/manage/user.html",
		controller: 'userController',
		data: {
			privilege: 4
		}
	});

	$stateProvider.state('privilege', {
		url: "/privilege",
		templateUrl: "app/components/errors/index.html"
	});

	$stateProvider.state('statistics', {
		url: "/statistics",
		templateUrl: "app/components/statistics/index.html",
		controller: require('./components/statistics/controller'),
		data: {
			privilege: 2
		}
	});

	$stateProvider.state('changelog', {
		url: "/changelog",
		templateUrl: "app/components/changelog/index.html",
		data: {
			privilege: 2
		}
	});

	jwtInterceptorProvider.tokenGetter = function() {
		return localStorage.getItem('id_token');
	};

	$httpProvider.interceptors.push('jwtInterceptor', function($q) {
		return {
			responseError: function(rejection) {
				if(rejection.status === 0) {
					return;
				}
				return $q.reject(rejection);
			},
			request: function (config) {
				if(config.method === 'GET'){
					var separator = config.url.indexOf('?') === -1 ? '?' : '&';
					config.url = config.url+separator+'noCache=' + new Date().getTime();
				}
				return config;
			}
		};
	});
	
}