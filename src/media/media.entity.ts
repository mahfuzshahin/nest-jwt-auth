// src/product-categories/product-news.entity.ts
import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne} from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity('media')
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // image, video, pdf, etc.

  @Column()
  filePath: string;

  @CreateDateColumn()
  createdAt: Date;

}