import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1723285296970 implements MigrationInterface {
  name = 'SchemaUpdate1723285296970';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" DROP COLUMN "applicationStatus"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."applications_applicationstatus_enum" AS ENUM('accepted', 'payment', 'proceeding', 'personalization_sent', 'pending', 'cancelled', 'completed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" ADD "applicationStatus" "public"."applications_applicationstatus_enum" NOT NULL DEFAULT 'pending'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "applications" DROP COLUMN "applicationStatus"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."applications_applicationstatus_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "applications" ADD "applicationStatus" character varying NOT NULL`,
    );
  }
}
