
require('angular-animate');

angular
.module('components', ['ngAnimate', 'textAngular', 'toaster', 'ngTable'] )
.controller('settingsCtrl', require('./settings/settingsCtrl') )
;

