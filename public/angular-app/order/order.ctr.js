angular.module('meanproduct').controller('OrderController', OrderController);

function OrderController($route,$filter,$window,$location,productsFactory,AuthFactory,jwtHelper) {
    var vm = this;
    var info = {};
    vm.orders = [];
    vm.carts=[];

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

    vm.loadOrder = function(){
        info.username = vm.loadName();
        productsFactory.getOrders(info).then(function(orders){
            vm.orders = orders.data;
            console.log(vm.orders);

        })
    }

    vm.loadOrder();


}