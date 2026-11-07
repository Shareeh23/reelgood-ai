import { env } from "node:process";

import { ChatGoogle } from "@langchain/google/node";
import { ChatPromptTemplate } from "@langchain/core/prompts";

if (!env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is required");
}

const model = new ChatGoogle({
  apiKey: env.GEMINI_API_KEY,
  model: "gemini-3.7-flash",
  temperature: 0.3,
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

const chain = promptTemplate.pipe(model);

export default async function getRecommendation(inputs: {
  userPrompt: string;
  genre: string;
  mood: string;
  count: number;
}) {
  const response = await chain.invoke(inputs);
  return response.text;
}
