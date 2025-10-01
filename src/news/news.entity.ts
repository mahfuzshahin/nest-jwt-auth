
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn, OneToMany
} from 'typeorm';
import {Category} from "../category/category.entity";
import {User} from "../users/user.entity";
import {Media} from "../media/media.entity";
import {NewsGallery} from "../news-gallery/news-gallery.entity";

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  content: string;

  // ---- Relations ----
  @ManyToOne(() => Category, (category) => category.news, { eager: true })
  category: Category;

  @ManyToOne(() => User, (user) => user.news, { eager: true })
  author: User;

  @ManyToOne(() => Media, { eager: true, nullable: true })
  attachment: Media;

  @OneToMany(() => NewsGallery, (gallery) => gallery.news, { cascade: true })
  galleries: NewsGallery[];

  // ---- Status ----
  @Column({ default: 'draft' })
  status: 'draft' | 'published';

  @Column({ type: 'timestamp', nullable: true })
  publishAt: Date;

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