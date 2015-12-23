
require('angular-animate');

angular
.module('components', ['ngAnimate', 'textAngular', 'toaster', 'ngTable', 'chart.js'] )
.controller('settingsCtrl', require('./settings/settingsCtrl') )
;

