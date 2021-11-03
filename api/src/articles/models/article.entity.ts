import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  article_title: string;

  @Column({ nullable: true })
  article_text: string;

  @Column({ nullable: true })
  article_bg_img: string;

  @Column({ nullable: true })
  article_min_img: string;

  @Column({ nullable: true })
  article_createdAt: Date;

  @Column({ nullable: true })
  category_id: string;
}
