import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ProductReviewService from "../../../../../services/product-review";
import {ProductReviewInput} from "../../../../../types/review";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const product_id = req.path.split('/')[3].toString()
    const productReviewService: ProductReviewService = req.scope.resolve("productReviewService");
    const product_reviews = await productReviewService.getProductReviews(product_id);
    
    if (!product_reviews || product_reviews.length === 0){
        return res.status(500).json({
            status: 'error',      
            message: 'No poduct reviews for this product yet!',
          });
    }
    
    return res.json({
      status: 'success',
      data: product_reviews,
      message: 'Product review retrieved successfully.',
    });

  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve product reviews.',
      error: 'Failed to retrieve product reviews.',
    });
  }
}
