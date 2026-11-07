import { Router } from "express"
import { recommendMovies } from "../controllers/recommendation.controller";

const recommendationRouter = Router();

recommendationRouter.post("/", recommendMovies);

export default recommendationRouter;