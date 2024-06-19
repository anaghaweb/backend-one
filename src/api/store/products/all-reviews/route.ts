import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ProductReviewService from "../../../../services/product-review";


export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const productReviewService : ProductReviewService = req.scope.resolve("productReviewService")
  const allReviews = await productReviewService.getAllProductReviews();
        if(!allReviews || allReviews.length === 0 ) {
            return res.json({message:"Product Review table is empty"}) 
        }
        return res.json({allReviews}) 
    }

