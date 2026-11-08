import { env } from "node:process";

import { ChatGoogle } from "@langchain/google/node";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import type { MovieRecommendationInput } from "../types/recommendation";
import {
  recommendationSchema,
  type Recommendations,
} from "../schemas/movie.schema";

if (!env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is required");
}

const model = new ChatGoogle({
  apiKey: env.GEMINI_API_KEY,
  model: "gemini-3.7-flash",
});

const promptTemplate = ChatPromptTemplate.fromMessages([
  [
    "system",
    `
    You are a movie recommendation expert.

    Return high-quality information based on:
      - user's request
      - genre
      - mood
      - count
    
    Every movie should feel intentional.
    Do not recommend only the most obvious title every time.
    `,
  ],
  [
    "human",
    `
    User request: {userPrompt}

    Preferences:
      - Genre: {genre}
      - Mood: {mood}
      - Number of movies: {count}
    `,
  ],
]);

const structuredModel = model.withStructuredOutput(recommendationSchema);
const structuredChain = promptTemplate.pipe(structuredModel);

export default async function getRecommendations(
  inputs: MovieRecommendationInput,
): Promise<Recommendations> {
  return structuredChain.invoke(inputs);
}
