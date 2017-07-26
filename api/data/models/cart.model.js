var mongoose= require('mongoose');
var Schema = mongoose.Schema;
var userSchema = mongoose.model('User');

var CartSchema = new Schema({
    user:{type:String, ref:'User'},
    totalPrice:{type: Number, default:0},
    products:[{
        product:{type: Schema.Types.ObjectId, ref:'Product'},
        quantity:{type: Number, default:0},
        price:{type: Number,default:0}
    }]
});
module.exports = mongoose.model('Cart',CartSchema);

var OrderSchema = new Schema({
    username:{type:String, ref:'User'},
    status:{
        type:String,
        default:"Pending"
    },
    cart:[CartSchema],
    createOn: {
        type: Date,
        default: Date.now
    }

});
module.exports = mongoose.model('Order',OrderSchema);