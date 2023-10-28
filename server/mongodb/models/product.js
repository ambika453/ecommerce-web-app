import mongoose from "mongoose";

const product = new mongoose.Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true},
    colors: [{type:String}],
    sizes: [{type:String}],
    photoUrl: [{ type: String }],
    description: { type: String, required: true},
})

const product_model = mongoose.model('product', product);

export default product_model;