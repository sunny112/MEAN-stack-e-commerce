angular
        .module("meanproduct")
        .controller("ProductsController", ProductsController);


function ProductsController( AuthFactory, productsFactory, jwtHelper,$filter, $window, $mdSidenav, $mdToast, $route) {

    var vm=this;

    vm.openSidebar = openSidebar;
    vm.closeSidebar = closeSidebar;
    vm.saveProduct = saveProduct;
    vm.addtocart = addtocart;
    vm.pager = {};
    vm.setPage = setPage;
    vm.pagerIndext = pagerIndext;

    vm.products;
    vm.product;
    vm.options=[1, 2, 3, 4, 5, 6, 7,8,9,10];

    initController();


    // productsFactory.getProducts().then(function(products){
    //     vm.products = products.data;
    //     // console.log(products.data);
    //     return vm.products;
    // });


    function addtocart(product, quantity){
        var quan = (typeof quantity === "undefined")?1:quantity;
        if(AuthFactory.isLoggedIn) {
            var token = $window.sessionStorage.token;
            var decodedToken = jwtHelper.decodeToken(token);
            username = decodedToken.username;
            console.log(username);
            var info = {};
            info.product = product;
            info.id = product._id;
            // info.username = JSON.parse({"username":username});
            info.username = username;
            info.quantity = quan;
            info.priceTotal = product.price * quan;
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

    function openSidebar (){
        $mdSidenav('left').open();
    };
    function closeSidebar (){
        $mdSidenav('left').close();
    };

    function saveProduct (product) {
        var product={
            title: product.title,
            imagePath: product.imagePath,
            description: product.description,
            price: product.price
        };

        if(product){
            productsFactory.saveProduct(product).then(function(result){
                console.log(result);
                if(result.data = "save success"){
                    vm.products.push(product);
                    vm.product = {};
                    vm.closeSidebar();
                    showToast("Product saved!");
                    $route.reload();
                }
            }).catch(function(error) {
                console.log(error);
            });
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

    function initController(){
        vm.setPage(1);
    }

    function pagerIndext(totalItems, currentPage, pageSize){
        currentPage = currentPage || 1;
        pageSize = pageSize || 12;

        var totalPages = Math.ceil(totalItems / pageSize);

        var startPage, endPage;

        if(totalPages <= 10){
            startPage = 1;
            endPage = totalPages;
        }else{
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
        var pages = _.range(startPage, endPage + 1);
         return {totalItems: totalItems,
             currentPage: currentPage,
             pageSize: pageSize,
             totalPages: totalPages,
             startPage: startPage,
             endPage: endPage,
             startIndex: startIndex,
             endIndex: endIndex,
             pages:pages
         }
    }
    function setPage(page) {
        productsFactory.getProducts().then(function (products) {
            vm.products = products.data;
            vm.products = $filter('orderBy')(vm.products, 'date', true);
            if (page < 1 || page) {
                if (page < 1 || page > vm.pager.totalPages) {
                    return;
                }
                console.log(vm.products);
                vm.pager = pagerIndext(vm.products.length, page);
                vm.products = vm.products.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
            }
        })
    }
}



