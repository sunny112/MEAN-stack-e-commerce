var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports.productsGetAll = function (req, res) {

    // var offset = 0;
    // var count = 4;
    // var maxCount = 35;
    //
    // if (req.query && req.query.offset) {
    //     offset = parseInt(req.query.offset, 10);
    // }
    //
    // if (req.query && req.query.count) {
    //     count = parseInt(req.query.count, 10);
    // }
    //
    // if(isNaN(offset) || isNaN(count)){
    //     res
    //         .status(400)
    //         .json({
    //             "message": "If supplied in querystring count and offset should be numbers"
    //         });
    //     return;
    // }
    //
    // if (count > maxCount){
    //     res
    //         .status(400)
    //         .json({
    //             "message": "Count limit of" +maxCount + "exceeded"
    //         });
    //     return
    // }

    Product
        .find()
        .sort({"createOn":1})
        // .skip(offset)
        // .limit(count)
        .exec(function(err, products){
            if (err){
                console.log("Error finding products");
                res
                    .status(500)
                    .json(err);
            }else{
                console.log("Found products", products.length);
                res
                    .json(products);
            }
        })
    // collection
    //     .find()
    //     .toArray(function (err, docs) {
    //         console.log("Found products", docs);
    //         res
    //             .status(200)
    //             .json(docs);
    //     });
};

module.exports.productsGetOne = function (req, res) {
    var productId = req.params.productId;
    console.log('GET productId', productId);
    Product
        .findById(productId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err){
                console.log("Error finding product");
                response.status = 500;
                response.message = err;
            }else if(!doc) {
                response.status =404;
                response.message = {
                        "message": "Product ID not found"
                    };
            }
                res
                    .status(response.status)
                    .json(response.message);
        });

};
module.exports.productGetById = function (req, res) {
    var productId = req.body.productId;
    console.log('GET productId', productId);
    Product
        .findById(productId)
        .exec(function (err, doc) {
            var response = {
                status: 200,
                message: doc
            };
            if (err){
                console.log("Error finding product");
                response.status = 500;
                response.message = err;
            }else if(!doc) {
                response.status =404;
                response.message = {
                    "message": "Product ID not found"
                };
            }
            res
                .status(response.status)
                .json(response.message);
        });

};

module.exports.productsAddOne = function (req, res) {
   Product
       .create({
           title: req.body.title,
           imagePath: req.body.imagePath,
           description: req.body.description,
           price: req.body.price
       } , function (err, product) {
            if(err){
                console.log("Error creating product");
                res
                    .status(400)
                    .json(err);
            }else{
                console.log("creating product", product);
                res
                    .status(201)
                    .json("save success");
            }
       });

};

