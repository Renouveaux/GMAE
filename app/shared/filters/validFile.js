/*
*
* Angular Filter to validate a file input in a form
*
*/

// Ne fonctionne pas, probleme de version d'angular ??

module.exports = function(){
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function (scope, el, attrs, ngModel) {
			el.bind('change', function () {
				scope.$apply(function () {
					ngModel.$setViewValue(el.val());
				});
			});
		}
	};
}