import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm";

export class ProductReview1717842200393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createPrimaryKey("product_review", ["id"])
    await queryRunner.createForeignKey("product_review", new TableForeignKey({
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "product",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("product_review", true)
    }

}
