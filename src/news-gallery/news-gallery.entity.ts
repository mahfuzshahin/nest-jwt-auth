
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import {Category} from "../category/category.entity";
import {User} from "../users/user.entity";
import {Media} from "../media/media.entity";
import {News} from "../news/news.entity";

@Entity('newsGallery')
export class NewsGallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  caption: string;

  @ManyToOne(() => News, (news) => news.galleries, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'news_id' })
  news: News;

  @ManyToOne(() => Media, { eager: true, nullable: false })
  @JoinColumn({ name: 'attachment_id' })
  attachment: Media;

  // ---- Audit ----
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  createdBy: number;

  @Column({ nullable: true })
  updatedBy: number;

}