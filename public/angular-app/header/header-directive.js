angular.module('meanproduct').directive('mhNavigation', mhNavigation);

function mhNavigation() {
    return {
        restrict: 'E',
        templateUrl: 'angular-app/header/header.html'
    };
}