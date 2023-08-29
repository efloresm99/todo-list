import { MigrationInterface, QueryRunner } from "typeorm";

export class ListNameLength1693324816452 implements MigrationInterface {
    name = 'ListNameLength1693324816452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "list" ADD "name" character varying(50) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "list" ADD "name" character varying NOT NULL`);
    }

}
