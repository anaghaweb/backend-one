import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ProductReviewService from "../../../../../services/product-review";

export default async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const productReviewService: ProductReviewService = req.scope.resolve("productReviewService");
    const productReviews = await productReviewService.getProductReviews(req.params.id);
    if(!productReviews){
        return res.json({
            status: 'error',      
            message: 'No rpoduct reviews for this product yet!',
          });
    }
    
    return res.json({
      status: 'success',
      data: productReviews,
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
