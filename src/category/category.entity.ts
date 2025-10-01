// src/product-categories/product-news.entity.ts
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany} from 'typeorm';
import {News} from "../news/news.entity";

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  description: string;


  @OneToMany(() => News, (news) => news.category)
  news: News[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  updatedBy: number;

}