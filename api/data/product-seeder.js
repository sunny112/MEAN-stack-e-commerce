var Product = require('./models/product.model');
var mongoose = require('mongoose');
var mongodbUri = 'mongodb://root:1234@ds141118.mlab.com:41118/shopping';
mongoose.connect(mongodbUri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {

    var products = [
        new Product({
            title:"cake",
            imagePath:"http://i67.tinypic.com/5eeeyh.jpg",
            description:"chocolate cake",
            price:10,
            stars: 3.2,
            reviews:[{
                name: "Sunny",
                id : "/user/sunny",
                review: "Great product",
                rating: 4
            }]
        }),
        new Product({
            title:"crab",
            imagePath:"http://i67.tinypic.com/8yvm74.jpg",
            description:"red crab",
            price:20,
            stars: 3.8,
            reviews:[{
                name: "Sunny",
                id : "/user/sunny",
                review: "Great product",
                rating: 4
            }]
        }),
        new Product({
            title:"mantis shrimp",
            imagePath:"http://i.imgur.com/Wr2zTUK.jpg",
            description:"delicious shrimp",
            price:15,
            stars: 4.2,
            reviews:[{
                name: "Sunny",
                id : "/user/sunny",
                review: "Great product",
                rating: 4
            }]
        }),
        new Product({
            title:"wine",
            imagePath:"http://i.imgur.com/bImIst6.jpg",
            description:"riesiling white wine",
            price:15,
            stars: 4.8,
            reviews:[{
                name: "Sunny",
                id : "/user/sunny",
                review: "Great product",
                rating: 4
            }]
        })
    ]

//save data to database
    var done = 0;
    for(var i = 0; i < products.length; i++){
        products[i].save(function(err,result){
            done++;
            if(done === products.length){
                exit();
            }
        });
    }
});

function exit(){
    mongoose.disconnect();
}