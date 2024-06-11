import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import ProductReviewService from "../../../../../services/product-review";
import {ProductReviewInput} from "../../../../../types/review";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const id = req.path.split('/')[3]
    const productReviewService: ProductReviewService = req.scope.resolve("productReviewService");
    const product_reviews = await productReviewService.getProductReviews(id);
    
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

export async function POST(req:MedusaRequest, res:MedusaResponse)
{
        try{
          const id = req.path.split('/')[3]
        const productReviewService:ProductReviewService = req.scope.resolve("productReviewService")
        const data = req.body as ProductReviewInput;
        
        
       const product_review = await productReviewService.addProductReview(id, data);
            if(!product_review){
                return res.status(200).json({
                    status: 'error',
                    message: 'Could not post your product review'
                })
            }
            return res.json({
              status: 'success',
              product_review,
               message: 'Product review added successfully.'
            })
            }
            catch (error:any) {
                return res.status(500).json({
                  status: 'error',
                  message: 'Failed submit product review.',
                  error: error.message,
                });
              }
            }

