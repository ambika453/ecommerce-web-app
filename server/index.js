import express from "express";
import * as dotenv from "dotenv";
import cors from 'cors';

import connectDB from "./connect.js";
import user_router from "./routes/user.js";
import product_router from "./routes/product.js";
import stripe_router from "./routes/stripe.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit:"50mb"}));

app.use('/users', user_router);
app.use('/products', product_router);
app.use('/stripe',stripe_router);

app.get('/', (req,res)=>{
    res.send("Hello from backend!");
})

const startserver = async() => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, ()=>console.log("server started on port http://localhost:8080"));
    }catch(err){
        console.log(err);
    }
}

startserver();


