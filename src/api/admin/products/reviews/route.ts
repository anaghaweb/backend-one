import { Router } from "express";
import { MedusaRequest, MedusaResponse } from '@medusajs/medusa';
import ProductReviewService from "../../../../services/product-review";
import { applyCors } from '../../../../middleware/cors';

export default () => {
    const router = Router();
    router.use(applyCors);

    router.get("/admin/products/:id/reviews",
        async (req: MedusaRequest, res: MedusaResponse) => {
            try {
                const productReviewService: ProductReviewService = req.scope.resolve("productReviewService");
                const product_reviews = await productReviewService.getProductReviews(req.params.id);

                if (!product_reviews || product_reviews.length === 0) {
                    return res.status(500).json({
                        status: 'error',
                        message: 'No product reviews for this product yet!',
                    });
                }
                return res.json({
                    status: 'success',
                    product_reviews,
                    message: 'Product reviews retrieved successfully.'
                });
            } catch (error:any) {
                return res.status(500).json({ status: 'error', error: error.message });
            }
        });

    return router;
}
