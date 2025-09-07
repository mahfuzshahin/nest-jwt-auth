// src/products/product.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ProductCategory } from '../product-categories/product-category.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;

  @Column({ default: true })
  inStock: boolean;

  @ManyToOne(() => ProductCategory, (category) => category.id, {
    eager: true, // 2. Automatically load the category when you fetch a product
  })
  category: ProductCategory;
}