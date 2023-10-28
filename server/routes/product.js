import express from "express";
import product_model from "../mongodb/models/product.js";

const product_router = express.Router();

product_router.route('/get').get(async(req,res)=>{
    try{
        const users  = await product_model.find({})
        console.log(users);
        res.status(201).json({ success: true, data: users});
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

product_router.route('/get/:pid').get(async(req,res)=>{
    const _id = req.params.pid;
    try{
        const product  = await product_model.findOne({_id:_id })
        if (product) {
            res.status(200).json({ success: true, data: product });
        } else {
            res.status(404).json({ success: false, message: 'Product not found' });
        }
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

product_router.route('/post').post(async(req,res)=>{
    try{
        console.log(req);
        const { name, price, colors, sizes, photoUrl, description } = req.body;

        const product = await product_model.create({ name, price, colors, sizes, photoUrl, description });

        res.status(201).json({ success: true, data: product});
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

product_router.route('/update/:pid').put(async(req,res)=>{
    const _id = req.params.pid

    try{
        console.log(req);
        const { name, price, colors, sizes, photoUrl, description } = req.body;

        const update = { name, price, colors, sizes, photoUrl, description }

        const product = await product_model.findOneAndUpdate({ _id: _id }, update, { new: true });

        if(product){
            res.status(201).json({ success: true, data: product});
        }else{
            res.status(201).json({ success: false, message: "Product not found"});
        }
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

export default product_router;