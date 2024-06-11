import { BaseEntity, Product } from "@medusajs/medusa";
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { Max, Min } from "class-validator";
import { generateEntityId } from "@medusajs/medusa/dist/utils";

@Entity()
export class ProductReview extends BaseEntity {

  @Index()
  @Column({ type: "varchar", nullable: false })
  product_id: string;

  // @ManyToOne(() => Product)
  // @JoinColumn({ name: "product_id" })
  // product: Product;

  @Column({ type: "varchar", nullable: false })
  title: string;

  @Column({ type: "varchar", nullable: false })
  user_name: string;

  @Column({ type: "int" })
  @Min(1)
  @Max(5)
  rating: number;

  @Column({ type: "text", nullable: false })
  content: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "prev");
  }

  constructor() {
    super();
    this.product_id = "";
    // this.product = new Product();
    this.title = "";
    this.user_name = "";
    this.rating = 0;
    this.content = "";
  }
}
