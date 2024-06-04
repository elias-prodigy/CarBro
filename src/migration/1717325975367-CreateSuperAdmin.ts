import { MigrationInterface, QueryRunner } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export class CreateSuperAdminUser1685647891234 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, 10);
    await queryRunner.query(`
            INSERT INTO "user" (id, firstname, lastname, email, password, role)
            VALUES ('${uuidv4()}', 'Super', 'Admin', 'superadmin@example.com', '${password}', 'superadmin');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "user" WHERE email = 'superadmin@example.com';
        `);
  }
}
