import { CartService, MedusaRequest, MedusaResponse, type PaymentSession } from "@medusajs/medusa";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2024-04-10",
  });

  
export async function POST (req:MedusaRequest, res:MedusaResponse) {
 
    const  cartId  = await req.body;
    console.log("cart ID", cartId)
    const cartService  =  req.scope.resolve<CartService>("cartService");
    const cart = await cartService.retrieve(cartId);
    const session = cart?.payment_session as PaymentSession
    const id = session.data.id as string;
    console.log("session provider data", session?.data.id, session?.data.client_secret, id) 
    
  // Create a PaymentIntent with the order amount and currency
  
    if(!cart){
        return null
    }

    if(session?.data.id === null){
      return res.json({error:"Payment Intent not received from payment form"})
    }
  try{
   
    const paymentIntent = await stripe.paymentIntents.update(
      id ,
     {
       description: "service Transaction", 

       shipping: {
           name: cart?.shipping_address?.first_name + "" + cart?.shipping_address?.last_name ,
           address: {
             line1: cart?.shipping_address?.address_1 ?? undefined  ,
             postal_code: cart?.shipping_address?.postal_code ?? undefined,
             city: cart?.shipping_address?.city ?? undefined,
             state: cart?.shipping_address?.province ?? "ABC" ,
             country:cart?.shipping_address?.country_code ?? undefined ,
           },
         },
        
        customer: session?.data?.customer as string,
         amount: cart?.total ?? 0,      
         currency: cart?.region.currency_code.toLowerCase() ,
         metadata:{
           medusa_customer_id:cart?.customer_id
         },
       
     });
     console.log("paymentIntent.client_secret -",paymentIntent.client_secret)
      return res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        
      });
  }
  catch(error){
    console.error(error);
    console.log(error)
    return res.json({error: "Error creating payment intent"})
  }
};