// angular.module('meanproduct').directive('productRating', productRating);
//
// function productRating() {
//   return {
//     restrict: 'E',
//     template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
//     bindToController: true,
//     controller: 'ProductController',
//     controllerAs: 'vm',
//     scope: {
//       stars: '@'
//     }
//   }
// }
//
// angular.module('meanproduct').component('productRating', {
//     bindings: {
//         stars: '@'
//     },
//     template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star">{{ star }}</span>',
//     controller: 'ProductController',
//     controllerAs: 'vm'
// });
