import faker from "faker";
import { MigrationInterface, QueryRunner } from "typeorm";

const PUBLIC_ARTICLE_COUNT = 5;
const PRIVATE_ARTICLE_COUNT = 3;
const DATA_POINTS_FOR_TABLE = 25;
const DATA_POINTS_FOR_PIE_CHART = 7;
const DATA_POINTS_FOR_TIME_SERIES = 50;
const DATA_POINTS_FOR_BAR_CHART = 10;

export class Seed1633194559526 implements MigrationInterface {

    name = 'Seed1633194559526'

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Admin user
        await queryRunner.query(`INSERT INTO "user" ("email", "last_name","first_name", "status") 
        VALUES ('admin@appseed.us','${faker.name.lastName()}','${faker.name.firstName()}','ACTIVE')`);

        // Regular user

        await queryRunner.query(`INSERT INTO "user" ("email", "last_name","first_name", "status") 
        VALUES ('user@appseed.us','${faker.name.lastName()}','${faker.name.firstName()}','ACTIVE')`);

        // Public articles

        for (let i = 0; i < PUBLIC_ARTICLE_COUNT; i++) {
            await queryRunner.query(`INSERT INTO "article" ("authorId", "title", "text", "publish_date", "slug", "category") 
            SELECT "id", '${faker.lorem.words(5)}','${faker.lorem.paragraphs(3)}','${faker.date.recent().toISOString()}', '${faker.lorem.slug()}','FRONT_PAGE' 
            FROM "user" WHERE "email" = 'admin@appseed.us'`);
        }

        // Private articles

        for (let i = 0; i < PRIVATE_ARTICLE_COUNT; i++) {
            await queryRunner.query(`INSERT INTO "article" ("authorId", "title", "text", "publish_date", "slug", "category") 
            SELECT "id", '${faker.lorem.words(5)}','${faker.lorem.paragraphs(3)}','${faker.date.recent().toISOString()}', '${faker.lorem.slug()}','BLOG' 
            FROM "user" WHERE "email" = 'user@appseed.us'`);
        }

        // Data points for table

        for(let i=0; i<DATA_POINTS_FOR_TABLE; i++) {
            await queryRunner.query(`INSERT INTO "data" ("name","value","type","timestamp") 
            VALUES ('${faker.commerce.productName()}', '${faker.datatype.number(100)}', 'FOR_TABLE', '${faker.date.recent().toISOString()}')`); 
        }

        // Data points for pie chart

        for(let i=0; i<DATA_POINTS_FOR_PIE_CHART; i++) {
            await queryRunner.query(`INSERT INTO "data" ("name","value","type","timestamp") 
            VALUES ('${faker.commerce.productName()}', '${faker.datatype.number(100)}', 'FOR_PIE_CHART', '${faker.date.recent().toISOString()}')`); 
        }

        // Data points for time series

        for(let i=0; i<DATA_POINTS_FOR_TIME_SERIES; i++) {
            await queryRunner.query(`INSERT INTO "data" ("name","value","type","timestamp") 
            VALUES ('${faker.commerce.productName()}', '${faker.datatype.number(100)}', 'FOR_TIME_SERIES', '${faker.date.recent().toISOString()}')`); 
        }

        // Data points for bar chart

        for(let i=0; i<DATA_POINTS_FOR_BAR_CHART; i++) {
            await queryRunner.query(`INSERT INTO "data" ("name","value","type","timestamp") 
            VALUES ('${faker.commerce.productName()}', '${faker.datatype.number(100)}', 'FOR_BAR_CHART', '${faker.date.recent().toISOString()}')`); 
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "data"`);
        await queryRunner.query(`DELETE FROM "article"`);
        await queryRunner.query(`DELETE FROM "user"`);
    }

}
