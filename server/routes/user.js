import express from "express";
import user_model from "../mongodb/models/user.js";

const user_router = express.Router();

user_router.route('/get').get(async(req,res)=>{
    try{
        const users  = await user_model.find({})
        console.log(users);
        res.status(201).json({ success: true, data: users});
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

user_router.route('/get/:uid').get(async(req,res)=>{
    const _id = req.params.uid;
    try{
        const user  = await user_model.findOne({_id:_id })
        if (user) {
            res.status(200).json({ success: true, data: user });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

user_router.route('/post').post(async(req,res)=>{
    try{
        console.log(req);
        const { fname, lname, number, email, password, area1, area2, city, state, pincode, bookmarks, country, carts } = req.body;

        const user = await user_model.create({
            fname,
            lname,
            email,
            number,
            area1,
            area2,
            country,
            city,
            state,
            pincode,
            password,
            bookmarks,
            carts
        })

        res.status(201).json({ success: true, data: user});
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

user_router.route('/:uid/update').put(async(req,res)=>{
    const _id = req.params.uid;
    try{
        console.log(req);
        const { fname, lname, number, email, password, area1, area2, county, city, state, pincode, bookmarks, carts } = req.body;

        const update = {
            fname,
            lname,
            email,
            number,
            area1,
            area2,
            county,
            city,
            state,
            pincode,
            password,
            bookmarks,
            carts
        };

        const updatedUser = await user_model.findOneAndUpdate({ _id: _id }, update, { new: true });

        if (updatedUser) {
            res.status(200).json({ success: true, data: updatedUser });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch(err) {
        res.status(500).json({ success: false, message: err});
    }
})

export default user_router;