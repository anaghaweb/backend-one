import { Router } from "express"
import bodyParser from "body-parser"
import { ConfigModule } from "@medusajs/medusa"  
import { getConfigFile } from "medusa-core-utils" 
import {MedusaRequest, MedusaResponse } from '@medusajs/medusa'
import ProductReviewService from "../services/product-review"
import { ProductReviewInput } from "src/types/review"
import path from "path";
import cors from "cors"

const rootDir = path.resolve(__dirname, "../../");
const { configModule } = getConfigFile<ConfigModule>(rootDir, 'medusa-config');

const store_cors= process.env.STORE_CORS as string
 const admin_cors = process.env.ADMIN_CORS as string


export default () => {
  const router = Router()
  const storeCorsOptions = {
    origin: store_cors.split(","),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }

  const adminCorsOptions = {
    origin: admin_cors.split(","),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }

  router.use(cors(storeCorsOptions));
  router.use(cors(adminCorsOptions));

  console.log("config Module", configModule.projectConfig.store_cors?.toString())
  router.get("/store/products/:id/reviews", cors(storeCorsOptions), (req:MedusaRequest, res:MedusaResponse) => {
    const productReviewService:ProductReviewService = req.scope.resolve("productReviewService")
    productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
      return res.json({
        product_reviews
      })
    }).catch((error) => {
      return res.status(500).json({ error: error.message });
    });
  })

  router.use(bodyParser.json())
  router.options("/store/products/:id/reviews", cors(storeCorsOptions))

  router.post("/store/products/:id/reviews", cors(storeCorsOptions), (req, res:MedusaResponse) => {
    const productReviewService:ProductReviewService = req.scope.resolve("productReviewService")
    const data = req.body as ProductReviewInput;
    productReviewService.addProductReview(req.params.id, data).then((product_review) => {
      return res.json({
        product_review
      })
    }).catch((error) => {
      return res.status(500).json({ error: error.message });
    });
  })

  const corsOptions = {
    origin: admin_cors.split(","),
    credentials: true,
  }
  router.options("/admin/products/:id/reviews", cors(corsOptions))
  router.get("/admin/products/:id/reviews", cors(corsOptions), async (req:MedusaRequest, res:MedusaResponse) => {
    const productReviewService:ProductReviewService = req.scope.resolve("productReviewService")
    productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
      return res.json({
        product_reviews
      })
    }).catch((error) => {
      return res.status(500).json({ error: error.message });
    });
  })

  return router;
}