import { EntityManager, IsNull, Not } from "typeorm";
import {ProductReview} from '../models/product-review'
import ProductReviewRepository from "../repositories/product-review";
import { TransactionBaseService } from "@medusajs/medusa";

interface InjectedDependencies {
  manager: EntityManager;
  productReviewRepository: typeof ProductReviewRepository;

}
class ProductReviewService extends TransactionBaseService {

  protected productReviewRepository_ : typeof ProductReviewRepository;
  constructor({ productReviewRepository }:InjectedDependencies) {
    super(arguments[0]);
    this.productReviewRepository_ = productReviewRepository    
  }
  
  async getProductReviews (product_id:string):Promise<ProductReview[] | null> {
    const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_);
    return await productReviewRepository.find({
      where: { product_id: product_id },
    });
  }
  async addProductReview (product_id: string, data: { title: string, user_name: string, content: string, rating: number }):Promise<ProductReview> {
    if (!data.title || !data.user_name || !data.content || !data.rating) {
      throw new Error("product review requires title, user_name, content, and rating")
    }
    const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_);
    const createdReview = productReviewRepository.create({
      product_id: product_id,
      title: data.title,
      user_name: data.user_name,
      content: data.content,
      rating: data.rating
    })
    const productReview = await productReviewRepository.save(createdReview);
    return productReview
  }

  async getAllProductReviews():Promise<ProductReview[]>{
    const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_)
    const allReviews = await productReviewRepository.find();
    return allReviews;
  }
}
export default ProductReviewService;

