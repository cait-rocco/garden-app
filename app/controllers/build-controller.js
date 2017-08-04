'use strict';

gardenApp.controller("BuildController", function($scope, $window, UserFactory) {

	$scope.drawGardenPlot = () => {
	  $window.location.href = `/#!/garden-plot`;
	 };

});
