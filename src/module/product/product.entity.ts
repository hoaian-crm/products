import { ResourceTag, TagRelation } from '@relationc/tags';
import { Type } from 'class-transformer';
import { IsObject, IsOptional } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  alias: string;

  @Column()
  price: number;

  @Column()
  discount: number = 0;

  @Column()
  total_sold: number;

  @Column()
  image: string;

  @Column()
  stock: number;

  @Column()
  inStock: boolean;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @TagRelation(Product)
  tags: ResourceTag[]
}
