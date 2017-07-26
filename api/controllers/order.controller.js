var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');
var Order= mongoose.model('Order');
module.exports.getOrders = function(req,res){
    var username = req.body.username;
    Order
        .find({username:username})
        .exec(function (err,order){
            if(err) console.log(err);
            else{
                console.log(order);
                res.json(order);
            }
        })

}

module.exports.saveOrders = function(req,res){
    var username = req.body.username;
    var cart = req.body.cart;
    var cartid = req.body.cartId;
    console.log(cart);
    Order
        .create({
            username:username,
            cart:cart
        }, function(err, order){
        if(err){
            console.log("Error creating order");
            res
                .json(err);
        }else{
            console.log("create order", order)
        }
        })

    Cart
        .remove({_id:cartid})
        .exec(function(err){
            if(err){
                console.log("Error");
                res
                    .json(err);
            }else{
                console.log("Complete Order");
                res
                    .json("Complete Order")
            }
        })
}


