import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationBetweenListAndActivity1693339428616 implements MigrationInterface {
    name = 'RelationBetweenListAndActivity1693339428616'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" ADD "listId" integer`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_07799a766fbe3b500632937bffd" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_07799a766fbe3b500632937bffd"`);
        await queryRunner.query(`ALTER TABLE "activity" DROP COLUMN "listId"`);
    }

}
