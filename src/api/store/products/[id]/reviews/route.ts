import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ProductReviewService from "../../../../../services/product-review";

export default async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const productReviewService: ProductReviewService = req.scope.resolve("productReviewService");
    const product_reviews = await productReviewService.getProductReviews(req.params.id);
    if(!product_reviews){
        return res.json({
            status: 'error',      
            message: 'No rpoduct reviews for this product yet!',
          });
    }
    else{
    return res.json({
      status: 'success',
      data: product_reviews,
      message: 'Product review retrieved successfully.',
    });
}
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve product reviews.',
      error: 'Failed to retrieve product reviews.',
    });
  }
}
