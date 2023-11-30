import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTagsForProduct1701331562567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create table if not exists product_tag (
        product_id int references products (id) on update cascade on delete cascade,
        tag_id int references tags (id) on update cascade on delete cascade,
        constraint product_tag_key primary key (product_id, tag_id)
    )
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    alter table products drop column product_tag
`);
  }
}
