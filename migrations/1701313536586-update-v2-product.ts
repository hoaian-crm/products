import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateV2Product1701313536586 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    alter table products add column discount int default 0
`);
    await queryRunner.query(`
    alter table products add column total_sold int default 0
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    alter table products drop column discount
`);
    await queryRunner.query(`
    alter table products drop column total_sold 
`);
  }
}
