import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1717324857327 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "car" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "brand" character varying NOT NULL,
        "model" character varying NOT NULL,
        "year" integer NOT NULL,
        "isRented" boolean NOT NULL DEFAULT false,
        "latitude" decimal(10,6),
        "longitude" decimal(10,6),
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_4d75e7f5d95dd9c6c196d4ed99e" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "firstname" character varying NOT NULL,
        "lastname" character varying,
        "email" character varying NOT NULL,
        "password" character varying NOT NULL,
        "role" public.user_role_enum DEFAULT 'user'::user_role_enum NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        "deletedAt" TIMESTAMP,
        CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_email" UNIQUE ("email")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "rental" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "userId" uuid,
        "carId" uuid,
        "startDate" TIMESTAMP NOT NULL DEFAULT now(),
        "endDate" TIMESTAMP,
        CONSTRAINT "PK_c4d5a57e1d1ee246f9e5d0e5dc4" PRIMARY KEY ("id"),
        CONSTRAINT "FK_user_rental" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_car_rental" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "rental"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "car"`);
    await queryRunner.query(`DROP TYPE "public"."role_enum"`);
  }
}
