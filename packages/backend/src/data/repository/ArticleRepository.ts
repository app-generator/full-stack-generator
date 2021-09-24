import { Article, GetArticlesRequest } from "generated-api";
import { getRepository, Like } from "typeorm";
import { ArticleEntity } from "../entity/Article";

export class ArticleRepository {
  public async getArticles(params: GetArticlesRequest): Promise<Article[]> {
    return getRepository(ArticleEntity).find({
      where: { title: Like(`%${params.filter}%`) },
      take: params.itemsPerPage || 20,
      skip: (params.page || 0) * (params.itemsPerPage || 20),
    });
  }

  public async addArticle(article: Article): Promise<Article> {
    return getRepository(ArticleEntity).save(article);
  }

  public async updateArticle(id: string, article: Article): Promise<Article> {
    return getRepository(ArticleEntity).save({ ...article, id });
  }

  public async deleteArticle(id: string): Promise<void> {
    return getRepository(ArticleEntity)
      .delete(id)
      .then(() => Promise.resolve());
  }
}
