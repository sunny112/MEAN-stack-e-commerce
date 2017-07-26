angular
        .module('meanproduct', ['ngMaterial', 'ngRoute', 'angular-jwt','angularPayments', 'ngAnimate', 'angularSpinner'])
        .config(config)
        .run(run);

    function config($httpProvider, $mdThemingProvider, $routeProvider) {

        $mdThemingProvider.theme('default')
            .primaryPalette('deep-purple')
            .accentPalette('orange');
//add customer interceptor
        $httpProvider.interceptors.push('AuthInterceptor');

        $routeProvider
            .when('/', {
                templateUrl: 'angular-app/product-list/products.html',
                controller: ProductsController,
                controllerAs: 'vm'
            })

            .when('/product/:id', {
            templateUrl: 'angular-app/product-detail/product.html',
            controller: ProductController,
            controllerAs: 'vm'
        })
            .when('/register', {
            templateUrl: 'angular-app/register/register.html',
            controller: RegisterController,
            controllerAs: 'vm',
            access: {
                restricted: false
            }
        })
            .when('/login',{
                templateUrl:'angular-app/login/login.html',
                controllerAs:'vm',
                access: {
                    restricted: false
                }
            })
            .when('/profile', {
                templateUrl: 'angular-app/profile/profile.html',
                controller: OrderController,
                controllerAs: 'vm',
                access: {
                    restricted: true
                }
            })
            .when('/cart', {
                templateUrl: 'angular-app/cart/cart.html',
                controller: CartController,
                controllerAs: 'vm'
            })
            .when('/checkout', {
                templateUrl: 'angular-app/checkout/checkout.html',
                controller: CheckoutController,
                controllerAs: 'vm'
            })
            .otherwise({
                redirectTo: '/'
            })


    }


function run($rootScope, $location, $window, AuthFactory) {
    $window.Stripe.setPublishableKey('pk_test_DI3bPUrZgp81E5kPbslGi3mh');
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
        if (nextRoute.access !== undefined && nextRoute.access.restricted && !$window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            event.preventDefault();
            $location.path('/');
        }
    });
}




