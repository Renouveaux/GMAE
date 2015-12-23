module.exports = function($window){

	return function (scope, element) {
		var w = angular.element($window);
		var pageContent = angular.element('#page-content');
		var header = $('header').height();
		var footer = $('footer').outerHeight();

		scope.getWindowDimensions = function () {
			return {
				'h': w.height(),
				'w': w.width()
			};
		};

		scope.$watch(scope.getWindowDimensions, function (newValue, oldValue) {

			pageContent.css('min-height', newValue.h - (header + footer) + 'px');

			scope.style = function () {
				return pageContent.css('min-height', newValue.h - (header.height() + footer.outerHeight()) + 'px');;
			};

		}, true);

		w.bind('resize', function () {
			scope.$apply();
		});
	}

};