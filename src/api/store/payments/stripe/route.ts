import { CartService, MedusaRequest, MedusaResponse, type PaymentSession } from "@medusajs/medusa";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
//     apiVersion: "2024-04-10",
//   });

  
export async function POST (req:MedusaRequest, res:MedusaResponse) {
 
    const  cartId  = await req.body;
    console.log("cart ID", cartId)
   
    
  // Create a PaymentIntent with the order amount and currency
  
   
  return res.json({ cartId, message: "Cart ID received successfully" });
  
};