import { CartService, MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2024-04-10",
  });

  
export default async function POST(req:MedusaRequest, res:MedusaResponse) {
 
    const {cartId} = await req.params;
    const cartService  =  req.scope.resolve<CartService>("cartService");
    const cart = await cartService.retrieve(cartId);

  // Create a PaymentIntent with the order amount and currency
  
    if(!cart){
        return null
    }
  try{
    const customer = await stripe.customers.create({
        name:  cart?.billing_address?.first_name + " " + cart?.billing_address?.last_name ,  
        email:cart?.email,
        address:  {
            line1: cart?.billing_address?.address_1 ?? undefined  ,
            postal_code: cart?.billing_address?.postal_code ?? undefined,
            city: cart?.billing_address?.city ?? undefined,
            state: cart?.billing_address?.province || " " ,
            country:cart?.billing_address?.country_code ?? undefined ,
          
        },
     
    });

    const paymentIntent = await stripe.paymentIntents.create({
        description: "ecommerce Transaction", 
        shipping: {
            name: cart?.shipping_address?.first_name + "" + cart?.shipping_address?.last_name ,
            address: {
              line1: cart?.shipping_address?.address_1 ?? undefined  ,
              postal_code: cart?.shipping_address?.postal_code ?? undefined,
              city: cart?.shipping_address?.city ?? undefined,
              state: cart?.shipping_address?.province || " " ,
              country:cart?.shipping_address?.country_code ?? undefined ,
            },
          },
          
         customer: customer.id,
          amount: cart?.total ?? 0,      
          currency: cart?.region.currency_code ?? undefined ,
         automatic_payment_methods:{
          enabled:true,
         },
      });
      return res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        
      });
  }
  catch(error){
    return res.json({error})
  }
};