angular.module('meanproduct').controller('CartController', CartController);

function CartController($route,$mdToast,$window,$location,productsFactory,AuthFactory,jwtHelper){
    var vm = this;
    // vm.message = 'Please login.';
    vm.products = [];
    vm.cart={};
    vm.cartempty = true;
    vm.update = update;

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

console.log( typeof vm.loadName());
    vm.loadCart = function() {
            var info = {};
            info.username = vm.loadName();
           console.log(info);
            productsFactory.showCart(info).then(function (doc) {
                console.log(doc.data);
                console.log(doc.data._id);
                vm.cart = doc.data;
                vm.cartId = doc.data._id;
                var cart = doc.data.products;
                var totalproducts = cart.length;
                if (totalproducts !== 0) {
                    console.log("cart is not empty");
                    // vm.totalPrice = doc.data.totalPrice;
                    vm.cartempty = false;
                    // vm.alltotal = "$" + (vm.totalPrice).toFixed(2);
                    cart.forEach(function (ele) {
                        var obj = {};
                        obj.productId = ele.product;
                        console.log(typeof obj.productId);
                        productsFactory.getproductbyId(obj).then(function (doc) {
                            doc.data.quantity = ele.quantity;
                            console.log(doc.data);
                            vm.products.push(doc.data);
                            console.log(vm.products);
                            console.log(vm.cartempty);

                        }, function (err) {
                            console.log(err)
                        });
                    });
                } else {
                    vm.cartempty = true;
                    console.log(vm.cartempty)
                }
            }, function (err) {
                console.log(err);
            });
    }
    vm.loadCart();
    vm.alltotal = function(){
        var total = 0;
        for(var i = 0;i<vm.products.length; i++){
            var item = vm.products[i];
           total += item.quantity*item.price;
           console.log(total)
                }
        return total;
    }

    vm.remove = function (product) {
            console.log(vm.loadName());
            console.log(product);
            var info = {};
            info.id = product._id;
            info.username = vm.loadName();
            info.priceTotal = product.price * product.quantity;
            console.log(info);
            productsFactory.delCart(info).then(function (data) {
                if (data.data = "removed product") {
                    console.log("Success");
                    $route.reload();
                }
            }, function (err) {
                console.log(err);
            })
    }

    function update(product,quantity,totalPrice) {
        var info = {};
        info.id = product._id;
        info.username = vm.loadName();
        info.quantity = quantity;
        info.priceTotal = totalPrice;
        console.log(info);
        productsFactory.updateCart(info).then(function (data) {
            if (data.data = "product updated") {
                console.log("Success");
                $route.reload();
            }
        }, function (err) {
            console.log(err);
        })
    }

    function showToast(message){
        $mdToast.show(
            $mdToast.simple()
                .content(message)
                .position('top, right')
                .hideDelay(3000)
        );
    }
}



