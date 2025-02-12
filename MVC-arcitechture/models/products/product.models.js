const mongoose = require('mongoose');

// defining schema
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: String,
    category: {
        type: String,
        required: true
    }
})

// add method to schema for business logic

productSchema.methods.calculateDiscountedPrice = function(discountParsentage) {
    const discount = this.price * discountParsentage /100;
    // return this.price * (1-discountParsentage/100);
    return this.price - discount;
}


const Product = mongoose.model('Product',productSchema);

module.exports = Product;


