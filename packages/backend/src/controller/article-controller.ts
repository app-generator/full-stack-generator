import { Router as RouterCreator, Request, Response, Router } from "express";
import { checkJwt } from "../middleware/auth.middleware";

import { Article, GetArticlesRequest } from "generated-api";
import { ArticleRepository } from "../data/repository/ArticleRepository";

export function articleController(): Router {
  const articleRouter = RouterCreator();
  const articleDAO = new ArticleRepository();

  articleRouter.get(
    "",
    async (request: Request, response: Response<Article[]>) => {
      const params: GetArticlesRequest = request.query as any;
      response.status(200).send(await articleDAO.getArticles(params));
    }
  );

  articleRouter.post(
    "",
    checkJwt,
    async (request: Request, response: Response<Article>) => {
      response.status(200).send(await articleDAO.addArticle(request.body));
    }
  );

  articleRouter.delete(
    "/:id",
    checkJwt,
    async (request: Request, response: Response<void>) => {
      const params: { id: string } = request.params as any;
      await articleDAO.deleteArticle(params.id);
      response.status(200);
    }
  );

  articleRouter.put(
    "/:id",
    checkJwt,
    async (request: Request, response: Response<Article>) => {
      const params: { id: string } = request.params as any;
      response
        .status(200)
        .send(await articleDAO.updateArticle(params.id, request.body));
    }
  );

  return articleRouter;
}
