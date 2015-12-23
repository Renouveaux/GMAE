module.exports = function() {
	return {
		restrict : 'A',
		templateUrl : './app/shared/breadcrumb/breadcrumbView.html',
		controller: function($rootScope, $scope, $location){

			var renderBreadcrumb = function() {
				var currentUrl = $location.url().split('/');
				currentUrl.shift();
				$scope.breadCrumb = currentUrl;
			};

			$rootScope.$on('$viewContentLoaded', function () {
				renderBreadcrumb();
			});

			renderBreadcrumb();

		}
	};
};