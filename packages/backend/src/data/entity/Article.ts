import { Article, ArticleCategoryEnum } from "generated-api";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User";

@Entity("article")
export class ArticleEntity implements Article {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ type: "text" })
  text!: string;

  @Column({name:"publish_date", type: "timestamp with time zone" })
  publishDate: Date = new Date();

  @Column({type:"varchar"})
  slug: string | undefined;

  @ManyToOne(() => UserEntity)
  author!: UserEntity;

  @Column({ type: "varchar" })
  category: ArticleCategoryEnum = ArticleCategoryEnum.Blog;
}
