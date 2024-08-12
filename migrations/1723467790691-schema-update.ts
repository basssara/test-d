import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1723467790691 implements MigrationInterface {
  name = 'SchemaUpdate1723467790691';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "FK_90ad8bec24861de0180f638b9cc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "regions" DROP CONSTRAINT "FK_86664a1d9f41d9b6c376c68cfc9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facilities" DROP CONSTRAINT "FK_f013c1234d304c1de3264b34562"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" RENAME COLUMN "userId" TO "serviceId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facilities" RENAME COLUMN "regionId" TO "districtId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "districts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "districtName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP, "deletedAt" TIMESTAMP, "facilityId" uuid, "regionId" uuid, CONSTRAINT "REL_7f25ad9b8da88d486160d7e278" UNIQUE ("facilityId"), CONSTRAINT "PK_972a72ff4e3bea5c7f43a2b98af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "regions" DROP CONSTRAINT "REL_86664a1d9f41d9b6c376c68cfc"`,
    );
    await queryRunner.query(`ALTER TABLE "regions" DROP COLUMN "facilityId"`);
    await queryRunner.query(`ALTER TABLE "services" ADD "userId" uuid`);
    await queryRunner.query(`ALTER TABLE "users" ADD "facilityId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_a52777ccb99dc7c3a7bbaeb792c" UNIQUE ("facilityId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" ADD CONSTRAINT "FK_a89eccbb084836279dfffb0f76b" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" ADD CONSTRAINT "FK_3905389899d96c4f1b3619f68d5" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "districts" ADD CONSTRAINT "FK_7f25ad9b8da88d486160d7e278d" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "districts" ADD CONSTRAINT "FK_22aacab5f414aec89d486bacbb0" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "facilities" ADD CONSTRAINT "FK_b96b3aedf14d909a478bcaca38e" FOREIGN KEY ("districtId") REFERENCES "districts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_a52777ccb99dc7c3a7bbaeb792c" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_a52777ccb99dc7c3a7bbaeb792c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facilities" DROP CONSTRAINT "FK_b96b3aedf14d909a478bcaca38e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "districts" DROP CONSTRAINT "FK_22aacab5f414aec89d486bacbb0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "districts" DROP CONSTRAINT "FK_7f25ad9b8da88d486160d7e278d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "services" DROP CONSTRAINT "FK_3905389899d96c4f1b3619f68d5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" DROP CONSTRAINT "FK_a89eccbb084836279dfffb0f76b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_a52777ccb99dc7c3a7bbaeb792c"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "facilityId"`);
    await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "regions" ADD "facilityId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "regions" ADD CONSTRAINT "REL_86664a1d9f41d9b6c376c68cfc" UNIQUE ("facilityId")`,
    );
    await queryRunner.query(`DROP TABLE "districts"`);
    await queryRunner.query(
      `ALTER TABLE "facilities" RENAME COLUMN "districtId" TO "regionId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" RENAME COLUMN "serviceId" TO "userId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "facilities" ADD CONSTRAINT "FK_f013c1234d304c1de3264b34562" FOREIGN KEY ("regionId") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "regions" ADD CONSTRAINT "FK_86664a1d9f41d9b6c376c68cfc9" FOREIGN KEY ("facilityId") REFERENCES "facilities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" ADD CONSTRAINT "FK_90ad8bec24861de0180f638b9cc" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
