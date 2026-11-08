import { z } from "zod";

export const movieSchema = z.object({
  title: z.string().describe("Movie title"),
  year: z.number().describe("Release year"),
  genre: z.array(z.string()).describe("List of genre"),
  cast: z.array(z.string()).describe("List of top 5 cast members"),
  reason: z
    .string()
    .describe("Why this matches the user's mood and preference"),
  rating: z.number().min(1).max(5).describe("Letterboxd style rating out of 5"),
});

export const recommendationSchema = z.object({
  movies: z.array(movieSchema).describe("List of recommended movies"),
});

export type Movie = z.infer<typeof movieSchema>;
export type Recommendations = z.infer<typeof recommendationSchema>;
