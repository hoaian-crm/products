import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tags1701320123449 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`
      create table if not exists tags (
      id serial,
      title text not null,
      description text not null,
      "createdAt" timestamp default NOW(),
      "updatedAt" timestamp default NOW(),
      primary key (id),
      unique(title)
)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('tags');
  }
}
