import { MigrationInterface, QueryRunner } from 'typeorm';

export class DeleteTableProduct1701710170910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          create table if not exists products (
          id serial,
          name text not null,
          alias text not null,
          price int default 0,
          description text,
          discount int default 0,
          total_sold int default 0,
          disable boolean default false,
          "createdAt" timestamp default NOW(),
          "updatedAt" timestamp default NOW(),
          primary key (id)
    );

    CREATE UNIQUE INDEX enable_alias_unique_idx 
    ON products (alias) 
    WHERE disable = false;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.query(`
    drop table products cascade
    `);
  }
}

//   unique index enable_alias_idx on (alias) where disable=false
