import { Router } from "express"
import bodyParser from "body-parser"
import { ConfigModule } from "@medusajs/medusa"  
import { getConfigFile } from "medusa-core-utils" 
import {MedusaRequest, MedusaResponse } from '@medusajs/medusa'
import ProductReviewService from "../../../../services/product-review"
import { ProductReviewInput } from "../../../../types/review"
import path from "path";
import cors from "cors"

export default () => {
    const router = Router();

    const adminCorsOptions = {
    origin: '*', // Replace with your admin domain
    methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

  router.get("/admin/products/:id/reviews", 
     cors(adminCorsOptions), 
    async (req:MedusaRequest, res:MedusaResponse) => {
    const productReviewService:ProductReviewService = req.scope.resolve("productReviewService")
    productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
      return res.json({
        status: 'success',
        product_reviews,
         message: 'Product reviews retrieved successfully.'
      })
    }).catch((error) => {
      return res.status(500).json({  status:error, error: error.message });
    });
  })

  return router;


}