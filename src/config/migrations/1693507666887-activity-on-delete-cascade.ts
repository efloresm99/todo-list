import { MigrationInterface, QueryRunner } from "typeorm";

export class ActivityOnDeleteCascade1693507666887 implements MigrationInterface {
    name = 'ActivityOnDeleteCascade1693507666887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_07799a766fbe3b500632937bffd"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_07799a766fbe3b500632937bffd" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activity" DROP CONSTRAINT "FK_07799a766fbe3b500632937bffd"`);
        await queryRunner.query(`ALTER TABLE "activity" ADD CONSTRAINT "FK_07799a766fbe3b500632937bffd" FOREIGN KEY ("listId") REFERENCES "list"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
