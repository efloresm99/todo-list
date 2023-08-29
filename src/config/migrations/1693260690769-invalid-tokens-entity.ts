import { MigrationInterface, QueryRunner } from "typeorm";

export class InvalidTokensEntity1693260690769 implements MigrationInterface {
    name = 'InvalidTokensEntity1693260690769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "invalid_token" ("id" SERIAL NOT NULL, "jti" uuid NOT NULL, "userId" uuid, CONSTRAINT "PK_eed57a279925c2d417c26a2a290" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "invalid_token" ADD CONSTRAINT "FK_975f0dfd9819e0b9f1887aafa86" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invalid_token" DROP CONSTRAINT "FK_975f0dfd9819e0b9f1887aafa86"`);
        await queryRunner.query(`DROP TABLE "invalid_token"`);
    }

}
