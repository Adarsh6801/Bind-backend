import { RequestHandler } from "express";
import Razorpay from "razorpay";


export const subscriptionPayment: RequestHandler = (req, res) => {
    try {
        const order=req.body
        const RazorpayConfig={
            key_id:"rzp_test_gAJDEjn0BI0746",
            key_secret:"fMqfXSiRYqesaC50plcPrXrZ"
        }
        var options = {
            amount: 500 , // amount in the smallest currency unit
            currency: "INR",
            receipt: "",
        };
        var instance = new Razorpay(RazorpayConfig)
        
        instance.orders.create(options, function (err, order) {
        
            return res.json(order);
        });
        
    } catch (error) {
  
    }
  };