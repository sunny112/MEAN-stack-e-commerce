var express = require('express');
var router = express.Router();


var ctrlProducts = require('../controllers/products.controller.js');
var ctrlReviews = require('../controllers/reviews.controller.js');
var ctrlUsers = require('../controllers/users.controller.js');
var ctrlCart = require('../controllers/cart.controller.js');
var ctrlOrder = require('../controllers/order.controller');
router
    .route('/products')
    .get(ctrlProducts.productsGetAll)
    .post(ctrlProducts.productsAddOne);

router
    .route('/products/:productId')
    .get(ctrlProducts.productsGetOne);

router
    .route('/cart/getproductbyId')
    .post(ctrlProducts.productGetById);
//review routes
router
    .route('/products/:productId/reviews')
    .get(ctrlReviews.reviewsGetAll)
    .post(ctrlUsers.authenticate, ctrlReviews.reviewsAddOne);

router
    .route('/products/:productId/reviews/:reviewId')
    .get(ctrlReviews.reviewsGetOne)
    // .put(ctrlReviews.reviewsUpdateOne);

//login,signup

router
    .route('/users/register')
    .post(ctrlUsers.register);

router
    .route('/users/login')
    .post(ctrlUsers.login);


router
    .route('/products/cart/addToCart')
    .post(ctrlCart.addCart);

router
    .route('/cart/loadCart')
    .post(ctrlCart.getCart);

router
    .route('/cart/delCart')
    .post(ctrlCart.delCart);

router
    .route('/cart/updateCart')
    .post(ctrlCart.updateCart);
// router
//     .route('/products/cart')
//     .get(ctrlCart.getCart);
// router
//     .route('/cart/createOrder')
//     .post(ctrlOrder.delallCart);

router
    .route('/profile')
    .post(ctrlOrder.getOrders);
router
    .route('/cart/check')
    .post(ctrlOrder.saveOrders);

router
    .route('/products/save')
    .post(ctrlProducts.productsAddOne);



module.exports = router;