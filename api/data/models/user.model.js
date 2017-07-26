var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var cartSchema = new Schema({
//     // user:{type:String, ref:'User'},
//     totalPrice:{type: Number, default:0},
//     products:[{
//         product:{type: Schema.Types.ObjectId, ref:'Product'},
//         quantity:{type: Number, default:0},
//         price:{type: Number,default:0}
//     }]
// });
var userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    name:{
        type: String
    },
    email:{
        type:String
    },
    password:{
        type: String,
        required: true
    }
});



mongoose.model('User', userSchema);