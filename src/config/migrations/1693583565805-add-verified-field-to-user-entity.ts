import { MigrationInterface, QueryRunner } from "typeorm";

export class AddVerifiedFieldToUserEntity1693583565805 implements MigrationInterface {
    name = 'AddVerifiedFieldToUserEntity1693583565805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "verified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "verified"`);
    }

}
