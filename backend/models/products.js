const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
});

const  ProductModel = mongoose.model('User', productSchema);
module.exports = ProductModel;