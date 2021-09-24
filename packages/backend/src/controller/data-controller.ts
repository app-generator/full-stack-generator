import { NextFunction, Request, Response, Router, Router as RouterCreator } from "express";
import { Data, GetDataRequest } from 'generated-api';
import { DataRepository } from "../data/repository/DataRepository";
import { checkJwt } from "../middleware/auth.middleware";

export function dataController(): Router {
  const dataRouter = RouterCreator();
  const dataDAO = new DataRepository();

  dataRouter.get(
    "",
    checkJwt,
    async (request: Request, response: Response<Data[]>, next: NextFunction) => {
      const params: GetDataRequest = request.query as any;
      try {
        response.status(200).send(await dataDAO.getData(params));
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  );

  dataRouter.post(
    "",
    checkJwt,
    async (request: Request, response: Response<Data>, next: NextFunction) => {
      try {
        response.status(200).send(await dataDAO.addData(request.body));
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  );

  dataRouter.delete(
    "/:id",
    checkJwt,
    async (request: Request, response: Response<void>, next: NextFunction) => {
      const params: { id: string } = request.params as any;
      try {
        await dataDAO.deleteData(params.id);
        response.status(200);
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  );

  dataRouter.put(
    "/:id",
    checkJwt,
    async (request: Request, response: Response<Data>, next: NextFunction) => {
      const params: { id: string } = request.params as any;
      try {
        response
          .status(200)
          .send(await dataDAO.updateData(params.id, request.body));
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  );

  return dataRouter;
}
