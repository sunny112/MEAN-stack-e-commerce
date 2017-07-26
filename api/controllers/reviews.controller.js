var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports.reviewsGetAll = function(req, res){
    var id = req.params.productId;
    console.log('GET productId', id);
    Product
        .findById(id)
        .select('reviews')
        .exec(function (err, doc) {
                var response = {
                    status: 200,
                    message: []
                };
                if(err){
                    console.log("Error finding");
                    response.status = 500;
                    response.message = err;
                }else if (!doc){
                    console.log("Product id not found", id);
                    response.status = 404;
                    response.message = {
                        "message":"Product id not found" + id
                    };
                }else{
                    response.message = doc.reviews ? doc.reviews :[];
                }
                res.status(response.status)
                    .json(response.message);
            });
        };



module.exports.reviewsGetOne = function(req, res) {
    var productId = req.params.productId;
    var reviewId = req.params.reviewId;
    console.log('GET reviewId ' + reviewId + ' for productId ' + productId);

    Product
        .findById(productId)
        .select('reviews')
        .exec(function(err, product) {
            var response = {
                status : 200,
                message : {}
            };
            if (err) {
                console.log("Error finding ");
                response.status = 500;
                response.message = err;
            } else if(!product) {
                console.log("Product id not found in database", id);
                response.status = 404;
                response.message = {
                    "message" : "product ID not found " + id
                };
            } else {
                // Get the review
                response.message = product.reviews.id(reviewId);
                // If the review doesn't exist Mongoose returns null
                if (!response.message) {
                    response.status = 404;
                    response.message = {
                        "message" : "Review ID not found " + reviewId
                    };
                }
            }
            res
                .status(response.status)
                .json(response.message);
        });
};

var _addReview = function (req, res, product) {
    product.reviews.push({
        name : req.body.name,
        rating : parseInt(req.body.rating, 10),
        review : req.body.review
    });

    product.save(function(err, productUpdated) {
        if (err) {
            res
                .status(500)
                .json(err);
        } else {
            res
                .status(200)
                .json(productUpdated.reviews[productUpdated.reviews.length - 1]);
        }
    });

};

module.exports.reviewsAddOne = function(req, res) {

    var id = req.params.productId;

    console.log('POST review to productId', id);

    Product
        .findById(id)
        .select('reviews')
        .exec(function(err, doc) {
            var response = {
                status : 200,
                message : doc
            };
            if (err) {
                console.log("Error finding product");
                response.status = 500;
                response.message = err;
            } else if(!doc) {
                console.log("productId not found in database", id);
                response.status = 404;
                response.message = {
                    "message" : "product ID not found " + id
                };
            }
            if (doc) {
                _addReview(req, res, doc);
            } else {
                res
                    .status(response.status)
                    .json(response.message);
            }
        });


};


// module.exports.reviewsUpdateOne = function(req, res) {
//     var productId = req.params.productId;
//     var reviewId = req.params.reviewId;
//     console.log('PUT reviewId ' + reviewId + ' for productId ' + productId);
//
//
//     Product
//         .findById(productId)
//         .select('reviews')
//         .exec(function(err, product) {
//             var thisReview;
//             var response = {
//                 status : 200,
//                 message : {}
//             };
//             if (err) {
//                 console.log("Error finding product");
//                 response.status = 500;
//                 response.message = err;
//             } else if(!product) {
//                 console.log("product id not found in database", id);
//                 response.status = 404;
//                 response.message = {
//                     "message" : "product ID not found " + id
//                 };
//             } else {
//                 // Get the review
//                 thisReview = product.reviews.id(reviewId);
//                 // If the review doesn't exist Mongoose returns null
//                 if (!thisReview) {
//                     response.status = 404;
//                     response.message = {
//                         "message" : "Review ID not found " + reviewId
//                     };
//                 }
//             }
//             if (response.status !== 200) {
//                 res
//                     .status(response.status)
//                     .json(response.message);
//             } else {
//                 thisReview.name = req.body.name;
//                 thisReview.rating = parseInt(req.body.rating, 10);
//                 thisReview.review = req.body.review;
//                 product.save(function(err, productUpdated) {
//                     if (err) {
//                         res
//                             .status(500)
//                             .json(err);
//                     } else {
//                         res
//                             .status(204)
//                             .json();
//                     }
//                 });
//             }
//         });
//
// };
