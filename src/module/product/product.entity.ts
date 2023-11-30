import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tag } from '../tags/tags.entity';

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
  discount: number;

  @Column()
  total_sold: number;

  @Column()
  description: string;

  @Column()
  @ManyToMany(() => Tag)
  @JoinTable({ name: 'product_tag' })
  // @JoinColumn({}) //update late
  tags: Tag[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
