var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    createOn: {
        type: Date,
        default: Date.now
    }
});

//格式JSON 校验：true
var productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    imagePath:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stars:{
        type:Number,
        min: 0,
        max: 5,
        default: 0,
        required:true
    },
    reviews: [reviewSchema],
    createOn: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Product',productSchema);