import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateProductTable1701220015500 } from './1701220015500-create-product-table';
import { UpdateV2Product1701313536586 } from './1701313536586-update-v2-product';
import { Tags1701320123449 } from './1701320123449-tags';
import { UpdateTagsForProduct1701331562567 } from './1701331562567-update-tags-for-product';
import { DeleteTableProduct1701710170910 } from './1701710170910-delete-table-product';
import { NewProduct1701877033366 } from './1701877033366-new-product';
config();

export default new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: +process.env.PG_PORT,
  entities: [],
  migrations: [
    CreateProductTable1701220015500,
    UpdateV2Product1701313536586,
    Tags1701320123449,
    UpdateTagsForProduct1701331562567,
    DeleteTableProduct1701710170910,
    NewProduct1701877033366,
  ],
});
