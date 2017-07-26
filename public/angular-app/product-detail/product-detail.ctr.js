angular.module('meanproduct')
            .controller('ProductController', ProductController);

function ProductController($routeParams, $window, AuthFactory,jwtHelper,productsFactory,$route,$mdToast, jwtHelper){
    var vm = this;
    var id = $routeParams.id;
    vm.product;
    vm.options=[1, 2, 3, 4, 5, 6, 7,8,9,10];
    vm.addtocart = addtocart;
    vm.showToast = showToast;
    console.log(typeof id);
    productsFactory.productDetail(id).then(
        function (response) {
        vm.product = response.data;
        console.log(response.data);
        // vm.stars = _getStarRating(response.data.stars);
        // console.log(response.data.stars);
    });
    // function _getStarRating(stars){
    //     return stars;
    // }
    vm.isLoggedIn = function(){
        if (AuthFactory.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    };
    vm.addReview = function() {
        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        var username = token.username;
        var postData = {
            name: username,
            rating: vm.rating,
            review: vm.review
        };
        if (vm.reviewForm.$valid) {
            productsFactory.postReview(id, postData).then(function(response) {
                if (response.status === 200) {
                    $route.reload();
                }
            }).catch(function(error) {
                console.log(error);
            });
        } else {
            vm.isSubmitted = true;
        }
    };
    function addtocart(product, quantity){
        var quan = (typeof quantity === "undefined")?1:quantity;
        if(AuthFactory.isLoggedIn) {
            var token = $window.sessionStorage.token;
            var decodedToken = jwtHelper.decodeToken(token);
            username = decodedToken.username;
            console.log(username);
            var info = {};
            info.product = vm.product;
            info.id = id;
            // info.username = JSON.parse({"username":username});
            info.username = username;
            info.quantity = quan;
            info.priceTotal = vm.product.price * quan;
            console.log(info);
            productsFactory.addToCart(info).then(function (data) {
                if (data.data = "addcart") {
                    console.log("Success");
                    showToast("Product added!")
                    $route.reload();
                }
            }, function (err) {
                console.log(err);
            })
        }else{
            $window.location.href ="/#!/login";
        }
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