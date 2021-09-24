import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import * as OpenApiValidator from "express-openapi-validator";
import helmet from "helmet";
import morgan from "morgan";
import "reflect-metadata";
import swaggerUi from "swagger-ui-express";
import { createConnection } from "typeorm";
import YAML from "yamljs";
import { articleController } from "./controller/article-controller";
import { userController } from "./controller/user-controller";


dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

export async function main(): Promise<void> {
  const PORT: number = parseInt(process.env.PORT as string, 10);

  const app = express();

  await createConnection();

  const apiSpec = "../../api-bundle.yaml";
  /**
   *  App Configuration
   */

  app.use(morgan("combined"));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(
    OpenApiValidator.middleware({
      apiSpec,
      validateRequests: true, 
      // validateResponses: true,
      ignoreUndocumented: true 
    })
  );

  const swaggerDocument = YAML.load(apiSpec);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  /**
   * Routes
   */

  app.use("/user", userController());
  app.use("/article", articleController());

  /**
   * Error Handler
   */
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.name === "UnauthorizedError") {
      res.status(401).json({ error: "Invalid Authorization" });
      return;
    }
    res
      .status(err.statusCode || err.status || 500)
      .json({ error: err.message || "Unexpected error" });
  });
  /**
   * Server Activation
   */

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

main();
