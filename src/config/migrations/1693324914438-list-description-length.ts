import { MigrationInterface, QueryRunner } from "typeorm";

export class ListDescriptionLength1693324914438 implements MigrationInterface {
    name = 'ListDescriptionLength1693324914438'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "list" ADD "description" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "list" ADD "description" character varying`);
    }

}
