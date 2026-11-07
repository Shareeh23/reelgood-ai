import type { Request, Response } from "express";
import type { MovieRecommendationInput } from "../types/recommendation"
import getRecommendation from "../services/langchain.service";

export async function recommendMovies(req: Request, res: Response) {
  try {
    const body: MovieRecommendationInput = req.body;
    const result = await getRecommendation(body);

    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Failed to generate movie recommendations:", err);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
}