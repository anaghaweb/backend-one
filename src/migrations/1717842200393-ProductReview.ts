import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ProductReview1717842200393 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(new Table({
            name: "product_review",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: "product_id",
                    type: "varchar",
                    isNullable: true
                },
                {
                    name: "title",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "user_name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "rating",
                    type: "int",
                    isNullable: false
                },
                {
                    name: "content",
                    type: "text",
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp with time zone",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp with time zone",
                    default: "now()"
                }
            ]
        }), true);
                
            // await queryRunner.createPrimaryKey("product_review", ["id"])
            await queryRunner.createForeignKey("product_review", new TableForeignKey({
                columnNames: ["product_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "product",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            }))
           
           
        }
    

    public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("product_review");
    const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("product_id") !== -1);
        if(foreignKey){
            await queryRunner.dropForeignKey("product_review", foreignKey);
        }
        
    await queryRunner.dropTable("product_review", true)
    }

}
