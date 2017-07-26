angular.module('meanproduct').controller('CheckoutController', CheckoutController);


function CheckoutController($window,$route,AuthFactory,productsFactory,jwtHelper){
    var vm=this;
    vm.loadName=function(){
        if(AuthFactory.isLoggedIn){
            var token = $window.sessionStorage.token;
            var decodedToken = jwtHelper.decodeToken(token);
            username = decodedToken.username;
            return username;
        }else{
            $location.path("/login");
        }
    }
    vm.findTotalPrice = function () {
        var info = {};
        info.username = vm.loadName();
        console.log(info);
        productsFactory.showCart(info).then(function (doc) {
            vm.totalAmount = doc.data.totalPrice;
        }, function (err) {
            console.log(err);
        })
    }
vm.findTotalPrice();

    vm.onSubmit = function () {
        $window.location.href ="/#!/profile";
    };

    vm.stripeCallback = function (code, result) {
        vm.processing = false;
        vm.hideAlerts();
        if (result.error) {
            vm.stripeError = result.error.message;
        } else {
            vm.stripeToken = result.id;
        }
    };

    vm.hideAlerts = function () {
        vm.stripeError = null;
        vm.stripeToken = null;
    };
    vm.placeOrder = function(){
        var info = {};
        info.username = vm.loadName();
        productsFactory.showCart(info).then(function (doc) {
            console.log(doc.data);
            console.log(doc.data._id);
            vm.cart = doc.data;
            vm.cartId = doc.data._id;
            var sent = {};
            sent.cartId = vm.cartId;
            sent.cart = vm.cart;
            sent.username = vm.loadName();
            productsFactory.check(sent).then(function (doc) {
                if (doc.data = "Complete Order") {
                    console.log("Success");
                    $window.location.href ="/#!/profile";
                    $route.reload();
                }
            }, function (err) {
                console.log(err);
            })
        }, function (err) {
            console.log(err);
        });


    }
}