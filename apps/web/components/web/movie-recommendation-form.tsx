"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  recommendationFormSchema,
  type RecommendationFormValues,
} from "@/lib/recommendation-form-schema";

type Props = {
  onSubmit: (values: RecommendationFormValues) => Promise<void>;
  isLoading: boolean;
};

export function MovieRecommendationForm({ onSubmit, isLoading }: Props) {
  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      userPrompt: "",
      genre: "",
      mood: "",
      count: 3,
    },
  });

  const { errors } = form.formState;

  return (
    <form
      className="space-y-6"
      onSubmit={form.handleSubmit(onSubmit)}
      aria-busy={isLoading}
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="userPrompt">What would you like to watch?</Label>
        <Textarea
          id="userPrompt"
          className="min-h-28 resize-y"
          placeholder="A character-driven drama about grief, like Demolition"
          aria-invalid={Boolean(errors.userPrompt)}
          aria-describedby={
            errors.userPrompt
              ? "userPrompt-hint userPrompt-error"
              : "userPrompt-hint"
          }
          {...form.register("userPrompt")}
        />
        <p id="userPrompt-hint" className="text-sm text-muted-foreground">
          Describe a film, theme, or story you have in mind.
        </p>
        {errors.userPrompt && (
          <p id="userPrompt-error" className="text-sm text-destructive">
            {errors.userPrompt.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="genre">Genre</Label>
        <Input
          id="genre"
          className="h-10"
          placeholder="Drama, science fiction, comedy…"
          aria-invalid={Boolean(errors.genre)}
          aria-describedby={errors.genre ? "genre-error" : undefined}
          {...form.register("genre")}
        />
        {errors.genre && (
          <p id="genre-error" className="text-sm text-destructive">
            {errors.genre.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="mood">Mood</Label>
        <Input
          id="mood"
          className="h-10"
          placeholder="Reflective, hopeful, tense…"
          aria-invalid={Boolean(errors.mood)}
          aria-describedby={errors.mood ? "mood-error" : undefined}
          {...form.register("mood")}
        />
        {errors.mood && (
          <p id="mood-error" className="text-sm text-destructive">
            {errors.mood.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="count">Number of recommendations</Label>
        <Input
          id="count"
          type="number"
          min={1}
          max={10}
          className="h-10"
          aria-invalid={Boolean(errors.count)}
          aria-describedby={errors.count ? "count-error" : "count-hint"}
          {...form.register("count", { valueAsNumber: true })}
        />
        <p id="count-hint" className="text-sm text-muted-foreground">
          Choose between 1 and 10 movies.
        </p>
        {errors.count && (
          <p id="count-error" className="text-sm text-destructive">
            {errors.count.message}
          </p>
        )}
      </div>

      <Button
        className="h-11 w-full text-sm"
        type="submit"
        disabled={isLoading}
      >
        {isLoading && (
          <LoaderCircle className="animate-spin" aria-hidden="true" />
        )}
        <span>{isLoading ? "Finding movies…" : "Find movies"}</span>
      </Button>
    </form>
  );
}
