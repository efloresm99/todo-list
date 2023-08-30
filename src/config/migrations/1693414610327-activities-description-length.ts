import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivitiesDescriptionLength1693414610327 implements MigrationInterface {
    name = 'ActivitiesDescriptionLength1693414610327'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "description" character varying(150)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD "description" character varying`);
    }

}
