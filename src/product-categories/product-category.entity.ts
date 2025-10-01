// src/product-categories/product-news.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_categories')
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;
}