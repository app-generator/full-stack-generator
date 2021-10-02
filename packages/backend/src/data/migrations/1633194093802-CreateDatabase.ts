import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDatabase1633194093802 implements MigrationInterface {
    name = 'CreateDatabase1633194093802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "status" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "data" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "value" integer NOT NULL, "timestamp" text NOT NULL, "type" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "article" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "text" text NOT NULL, "publish_date" text NOT NULL, "slug" varchar NOT NULL, "category" varchar NOT NULL, "authorId" integer, CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "data"`);
        await queryRunner.query(`DROP TABLE "article"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
