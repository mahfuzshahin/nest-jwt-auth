import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsOptional} from "class-validator";
import {News} from "../news/news.entity";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  passwordHash: string;

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
  }

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @OneToMany(() => News, (news) => news.author) // 👈 relation for authored news
  news: News[];
}