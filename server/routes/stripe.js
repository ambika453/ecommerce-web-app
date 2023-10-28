import express from 'express';
import Stripe from 'stripe';

const stripe_router = express.Router();
const stripe = Stripe("sk_test_51NpkqbSFy4cJfUpdIohDLJq01YUPywv3eJaQYSeQiCY4TDByMY6KJjytbtKCwfd6fzDf0269eIP2n42gs5Reqykv007CxodCjt");

stripe_router.route('/create-checkout-session').post(async(req,res)=>{
    const {uid, carts} = req.body;
    const line_items = carts.map((cart)=>({
        price_data:{
            currency:'inr',
            product_data:{
                name:cart.name
            },
            unit_amount: cart.price*100,
        },
        quantity:cart.qty
    }))
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items,
            mode:"payment",
            success_url:`http://localhost:5173/user/${uid}/payment-successful`,
            cancel_url: `http://localhost:5173/user/${uid}/payment-cancelled`
        });

        res.status(201).json({ success: true, id:session.id});
    } catch (err) {
        res.status(500).json({ success: false, message: err});
    }
})

export default stripe_router;