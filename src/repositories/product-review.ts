import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ProductReview } from "src/models/product-review"

// @EntityRepository(ProductReview)
// export class ProductReviewRepository extends Repository<ProductReview>{

// }

const ProductReviewRepository = dataSource.getRepository(ProductReview)

export default ProductReviewRepository