import { env } from "node:process";

import express, { type RequestHandler, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import recommendationRouter from "./routes/recommendation.route";

const app = express();

const port = Number(env.PORT ?? 8080);

app.use(cors({ origin: env.FRONTEND_URL }));

app.use(helmet() as unknown as RequestHandler);

app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "healthy",
  });
});

app.use("/api/recommend", recommendationRouter);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const shutdown = (signal: NodeJS.Signals) => {
  console.log(`${signal} received; closing HTTP server`);

  server.close((error) => {
    if (error) {
      console.error("Error while closing HTTP server:", error);
      process.exitCode = 1;
      return;
    }

    console.log("HTTP server closed");
  });
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
