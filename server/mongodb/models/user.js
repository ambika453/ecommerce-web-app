import mongoose from "mongoose";

const cartItem = new mongoose.Schema({
    pid : { type: String, required: false },
    name: {type: String, required: false},
    image: {type: String, required: false},
    color: { type: String, required: false},
    size: { type: String, required: false},
    price: {type: Number, required: false},
    qty: { type: Number, required: false}
})

const user = new mongoose.Schema({
    fname: { type: String, required: false },
    lname: { type: String, required: false },
    email: { type: String, required: false },
    number: { type: Number, required: false },
    area1: { type: String, required: false },
    area2: { type: String, required: false },
    country: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    pincode: { type: Number, required: false },
    password: { type: String, required: false},
    bookmarks: [{ type: String }],
    carts: [cartItem]
})

const user_model = mongoose.model('user', user);

export default user_model;