var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var User = mongoose.model('User');
var Cart = mongoose.model('Cart');

module.exports.getCart = function(req,res){
    var username = req.body.username;
// console.log('Get cartID' + cartId);
Cart
    .findOne({user: username})
    .exec(function(err, doc){
        if(err) console.log(err);
        else{
            res.json(doc);
        }
    });
};

module.exports.addCart = function(req, res){
    var username = req.body.username;
    console.log(username);
    Cart
        .findOne({user: username})
        .exec(function(err,cart){
            var products = {
                product:req.body.id,
                price:req.body.product.price,
                quantity: req.body.quantity};
            console.log(products);
            if(cart ==null){
                console.log("first time");
                Cart.create({user:username, totalPrice:req.body.priceTotal, products:products})
                    .then(function (err,cart) {
                            if (err) {
                                res
                                    .status(500)
                                    .json(err);
                            } else {
                                res
                                    .status(200)
                                    .json(cart);
                            }
                        })
                }else{
                var picked;
                for (var i = 0; i < cart.products.length; i++){
                    if(cart.products[i].product == req.body.id){
                        picked = cart.products[i];
                    }
                }
                if(typeof picked === "undefined"){
                    console.log("first time add");
                    cart.products.push(products);
                    cart.totalPrice = cart.totalPrice + parseFloat(req.body.priceTotal);
                    cart.save(function (err) {
                        if(!err){
                            res.json("addcart");
                        }else{
                            console.log(err)
                        }
                    })
                }else{
                    console.log("second add");
                    var num = parseInt(picked.quantity);
                    console.log(cart.products);
                    for(var i = 0; i<cart.products.length;i++){
                        if(cart.products[i].product == req.body.id){
                            console.log(cart.products[i].product);
                            cart.products[i].quantity = num + parseInt(req.body.quantity);
                        }
                    }
                    cart.totalPrice = cart.totalPrice + parseFloat(req.body.priceTotal);
                    cart.save(function (err){
                        if(!err){
                            res.json("addcart");
                        }else{
                            console.log(err);
                        }
                    })
                }
            }


        })
}

module.exports.delCart = function(req, res){
    var username = req.body.username;
    console.log(username);
    Cart
        .findOne({user: username})
        .exec(function (err,cart) {
        for(var i=0; i<cart.products.length;i++){
            if(cart.products[i].product == req.body.id){
                cart.products.splice(i,1);
            }
        }
        cart.totalPrice = (cart.totalPrice-req.body.priceTotal).toFixed(2);
        cart.save(function(err){
            if(err){console.log(err)}
            else{
                res.json("removed product");
            }
        })
    })
}

module.exports.updateCart = function(req, res){
    var username =req.body.username;
    var quantity =  req.body.quantity;
    // var priceTotal = req.body.priceTotal;
    // console.log(priceTotal);
    Cart.findOne({user: username})
           // .update({products:{product:product}},
           //  {$set: {totalPrice:priceTotal},{products:{quantity:quantity}}})
           .exec(function(err, cart){
               for(var i = 0; i<cart.products.length;i++){
                   if(cart.products[i].product == req.body.id){
                       console.log(cart.products[i].product);
                       cart.products[i].quantity = quantity;
                   }
               }
               cart.totalPrice = req.body.priceTotal;
               console.log(cart.priceTotal);
               cart.save(function (err){
                   if(!err){
                       res.json("product updated");
                   }else{
                       console.log(err);
                   }
               })
        })
}







