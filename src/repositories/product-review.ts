import { Repository } from "typeorm";
import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { ProductReview } from "src/models/product-review"


export class ProductReviewRepository extends Repository<ProductReview>{

}


