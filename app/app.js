/********************************************************************

Liste des modules requis pour le fonctionnement de l'application

********************************************************************/
$ = require('jquery-browserify');
require('angular/angular');
require('angular-i18n/angular-locale_fr-fr');
require('angular-ui-router');
require('angular-jwt');
require('angular-cookies');
require('angular-resource');
require('angular-sanitize');
require('angular-bootstrap-npm');
require('angularjs-toaster');
require('ng-file-upload');
require('angular-timeago');
require('angular-marked');
require('../assets/js/textAngular');
require('../assets/js/socket.io');
require('../assets/js/ng-table');
require('sweetalert');


Highcharts = require('highcharts');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts-ng');

require('../app/shared/json/json-formatter');

require('./shared'); // Regroupe les directives et la partie login

require('./components'); // La partie applicative du site.

/********************************************************************

Configuration de notre application

********************************************************************/
angular
.module('gmae', ['ui.router', 'angular-jwt', 'shared', 'components', 'ui.bootstrap', 'jsonFormatter', 'yaru22.angular-timeago', 'ngFileUpload', 'hc.marked', 'highcharts-ng'])
.config( require('./router') )
.run( require('./init') )
.controller('AppController', require('./appCtrl.js') )
.directive('resize', require('./resizer') )
.filter('capitalize', require('./shared/filters/capitalizeFilter') )
;


global.capitalize = function(input){
	if (input!=null)
		input = input.toLowerCase();
	return input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
};

