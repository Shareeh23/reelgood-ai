import { z } from "zod";

export const recommendationFormSchema = z.object({
  userPrompt: z.string().trim().min(10, "Describe what you want to watch."),
  genre: z.string().trim().min(1, "Enter a genre or leave it broad."),
  mood: z.string().trim().min(1, "Describe the mood you want."),
  count: z.number().int().min(1).max(10),
});

export type RecommendationFormValues = z.infer<
  typeof recommendationFormSchema
>;