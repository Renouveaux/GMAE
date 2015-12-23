
angular
.module('shared', ['ngCookies', 'ngResource', 'angular-jwt'] )
.factory('configService', require('../configs') )
.directive('ngHeader', require('./header/headerDirective') )
.directive('ngBreadcrumb', require('./breadcrumb/breadcrumbDirective') )
.directive('ngFooter', require('./footer/footerDirective') )
.directive('ngMenu', require('./sidenav/sidenavDirective') )
.directive('ngLogin', require('./login/loginDirective') )
.directive('ngSocket', require('./socket/socketDirective') )
.factory('loginService', require('./login/loginService') )
.factory('socketService', require('./socket/socketService') )
.factory('sidenavService', require('./sidenav/sidenavService') )
.filter('capitalize', require('./filters/capitalizeFilter'))
;