import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTagsForProduct1701331562567 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create table product_tag (
        product_id int references product_id (id) on update cascade on delete cascade,
        tag_id int references product_id (id) on update cascade on delete cascade
    )
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    alter table products drop column product_tag
`);
  }
}
