import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateProductTable1701220015500 } from './1701220015500-create-product-table';
config();

export default new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: +process.env.PG_PORT,
  entities: [],
  migrations: [CreateProductTable1701220015500],
});
