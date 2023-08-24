import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDbStructure1692837890795 implements MigrationInterface {
    name = 'InitialDbStructure1692837890795'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "list" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "finished" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "ownerId" uuid, CONSTRAINT "PK_d8feafd203525d5f9c37b3ed3b9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying(50) NOT NULL, "lastName" character varying(60) NOT NULL, "email" character varying(75) NOT NULL, "password" character varying(128) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."activity_priority_enum" AS ENUM('high', 'medium', 'low')`);
        await queryRunner.query(`CREATE TABLE "activity" ("id" BIGSERIAL NOT NULL, "name" character varying(70) NOT NULL, "description" character varying, "priority" "public"."activity_priority_enum" NOT NULL DEFAULT 'medium', "completed" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "list" ADD CONSTRAINT "FK_f0f290e54e6663b786fe5a8134f" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "list" DROP CONSTRAINT "FK_f0f290e54e6663b786fe5a8134f"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`DROP TYPE "public"."activity_priority_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "list"`);
    }

}
