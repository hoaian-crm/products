import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1701220015500 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`
      create table if not exists products (
      id serial,
      name text not null,
      alias text not null,
      price int default 0,
      description text,
      "createdAt" timestamp default NOW(),
      "updatedAt" timestamp default NOW(),
      primary key (id),
      unique(alias)
)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropTable('products');
  }
}
