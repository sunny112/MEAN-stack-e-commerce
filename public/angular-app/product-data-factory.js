angular
        .module("meanproduct")
        .factory("productsFactory", productsFactory);

function  productsFactory($http) {
    return{
        getProducts: getProducts,
        productDetail: productDetail,
        postReview : postReview,
        addToCart: addToCart,
        saveProduct: saveProduct,
        showCart:showCart,
        getproductbyId:getproductbyId,
        delCart:delCart,
        updateCart:updateCart,
        check:check,
        getOrders:getOrders
        // createOrder:createOrder
    };
           function getProducts(){
               return $http.get('api/products');
           }

           function productDetail(id) {
               return $http.get('/api/products/' + id);
           }

           function postReview(id, review){
               return $http.post('/api/products/' + id +'/reviews', review);
           }
           function addToCart(info){
               return $http.post('/api/products/cart/addToCart/', info);
           }
            function saveProduct(product){
               return $http.post('/api/products/save', product);
            }
            function showCart(info){
                return $http.post('/api/cart/loadCart', info);
            }

            function getproductbyId(obj) {
                return $http.post('api/cart/getproductbyId', obj);
            }
            function delCart(info){
                return $http.post('api/cart/delCart', info);
            }
            function updateCart(info){
                return $http.post('api/cart/updateCart', info);
            }
            function check(info){
                return $http.post('api/cart/check', info);
            }
            function getOrders(info){
                return $http.post('api/profile', info);
            }

        }
