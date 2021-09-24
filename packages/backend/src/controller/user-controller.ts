import { Router as RouterCreator, Request, Response, Router } from "express";
import { checkJwt } from "../middleware/auth.middleware";

import { GetUsersRequest, User } from "generated-api";
import { UserRepository } from "../data/repository/UserRepository";
export function userController(): Router {
  const userRouter = RouterCreator();
  const userDAO = new UserRepository();

  userRouter.get(
    "",
    checkJwt,
    async (request: Request, response: Response<User[] | any>) => {
      const params: GetUsersRequest = request.query as any;
      try {
        response.status(200).send(await userDAO.getUsers(params));
      } catch (err) {
        response.status(500).json({error:"An unexpected error has occurred"});
      }
    }
  );

  userRouter.post(
    "",
    checkJwt,
    async (request: Request, response: Response<User>) => {
      response.status(200).send(await userDAO.addUser(request.body));
    }
  );

  userRouter.delete(
    "/:id",
    checkJwt,
    async (request: Request, response: Response<void>) => {
      const params: { id: string } = request.params as any;
      await userDAO.deleteUser(params.id);
      response.status(200);
    }
  );

  userRouter.put(
    "/:id",
    checkJwt,
    async (request: Request, response: Response<User>) => {
      const params: { id: string } = request.params as any;
      response
        .status(200)
        .send(await userDAO.updateUser(params.id, request.body));
    }
  );

  return userRouter;
}
