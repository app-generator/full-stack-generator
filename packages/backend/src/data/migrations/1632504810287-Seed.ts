import faker from "faker";
import { MigrationInterface, QueryRunner } from "typeorm";

const PUBLIC_ARTICLE_COUNT = 5;
const PRIVATE_ARTICLE_COUNT = 3;
const DATA_POINTS_FOR_TABLE = 25;
const DATA_POINTS_FOR_PIE_CHART = 7;
const DATA_POINTS_FOR_TIME_SERIES = 50;
const DATA_POINTS_FOR_BAR_CHART = 10;

export class Seed1632504810287 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        // Admin user
        await queryRunner.query(`INSERT INTO "public"."user" ("email", "last_name","first_name", "status") 
        VALUES ('admin@appseed.us','${faker.name.lastName()}','${faker.name.firstName()}','ACTIVE')`);

        // Regular user

        await queryRunner.query(`INSERT INTO "public"."user" ("email", "last_name","first_name", "status") 
        VALUES ('user@appseed.us','${faker.name.lastName()}','${faker.name.firstName()}','ACTIVE')`);

        // Public articles

        for (let i = 0; i < PUBLIC_ARTICLE_COUNT; i++) {
            await queryRunner.query(`INSERT INTO "public"."article" ("authorId", "title", "text", "publish_date", "slug", "category") 
            SELECT "id", '${faker.lorem.words(5)}','${faker.lorem.paragraphs(3)}','${faker.date.recent().toISOString()}', '${faker.lorem.slug()}','FRONT_PAGE' 
            FROM "public"."user" WHERE "email" = 'admin@appseed.us'`);
        }

        // Private articles

        for (let i = 0; i < PRIVATE_ARTICLE_COUNT; i++) {
            await queryRunner.query(`INSERT INTO "public"."article" ("authorId", "title", "text", "publish_date", "slug", "category") 
            SELECT "id", '${faker.lorem.words(5)}','${faker.lorem.paragraphs(3)}','${faker.date.recent().toISOString()}', '${faker.lorem.slug()}','BLOG' 
            FROM "public"."user" WHERE "email" = 'user@appseed.us'`);
        }

        // Data points for table

        for(let i=0; i<DATA_POINTS_FOR_TABLE; i++) {
            await queryRunner.query(`INSERT INTO "public"."data" ("name","value","type","timestamp") 
            VALUES ('${faker.commerce.productName()}', '${faker.datatype.number(100)}', 'FOR_TABLE', '${faker.date.recent().toISOString()}')`); 
        }

        // Data points for pie chart

        for(let i=0; i<DATA_POINTS_FOR_PIE_CHART; i++) {
            await queryRunner.query(`INSERT INTO "public"."data" ("name","value","type","timestamp") 
            VALUES ('${faker.commerce.productName()}', '${faker.datatype.number(100)}', 'FOR_PIE_CHART', '${faker.date.recent().toISOString()}')`); 
        }

        // Data points for time series

        for(let i=0; i<DATA_POINTS_FOR_TIME_SERIES; i++) {
            await queryRunner.query(`INSERT INTO "public"."data" ("name","value","type","timestamp") 
            VALUES ('${faker.commerce.productName()}', '${faker.datatype.number(100)}', 'FOR_TIME_SERIES', '${faker.date.recent().toISOString()}')`); 
        }

        // Data points for bar chart

        for(let i=0; i<DATA_POINTS_FOR_BAR_CHART; i++) {
            await queryRunner.query(`INSERT INTO "public"."data" ("name","value","type","timestamp") 
            VALUES ('${faker.commerce.productName()}', '${faker.datatype.number(100)}', 'FOR_BAR_CHART', '${faker.date.recent().toISOString()}')`); 
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "public"."data"`);
        await queryRunner.query(`DELETE FROM "public"."article"`);
        await queryRunner.query(`DELETE FROM "public"."user"`);
    }

}
