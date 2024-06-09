import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import {ProductReview}  from '../models/product-review'

const ProductReviewRepository = dataSource.getRepository(ProductReview)

export default ProductReviewRepository 