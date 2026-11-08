"use client";

import Link from "next/link";
import { useState } from "react";

import { MovieCard } from "@/components/web/movie-card";
import { MovieRecommendationForm } from "@/components/web/movie-recommendation-form";
import { MovieResultsSkeleton } from "@/components/web/movie-results-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RecommendationFormValues } from "@/lib/recommendation-form-schema";
import type { Movie } from "@/types/movie";

type ApiResponse = {
  success: boolean;
  result?: { movies: Movie[] };
  message?: string;
};

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  async function getRecommendations(values: RecommendationFormValues) {
    setIsLoading(true);
    setError("");
    setHasSubmitted(true);

    try {
      const apiUrl = (
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080"
      ).replace(/\/$/, "");

      const response = await fetch(`${apiUrl}/api/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as ApiResponse;

      if (!response.ok || !data.success || !data.result) {
        throw new Error(data.message ?? "Could not get recommendations.");
      }

      setMovies(data.result.movies);
    } catch (requestError) {
      setMovies([]);
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen">
      <header className="border-b">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="rounded-sm text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="text-primary">reel</span>good
            <span className="sr-only"> home</span>
          </Link>
          <p className="hidden text-sm text-muted-foreground sm:block">
            Your next favorite movie awaits
          </p>
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          Movie finder
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          What are you in the mood to watch?
        </h1>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Tell us what you’re looking for and get thoughtful movie
          recommendations.
        </p>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)]">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Describe your movie night
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MovieRecommendationForm
                onSubmit={getRecommendations}
                isLoading={isLoading}
              />
            </CardContent>
          </Card>

          <section aria-labelledby="recommendations-heading">
            <div className="mb-4 flex min-h-8 items-center justify-between gap-4">
              <h2
                id="recommendations-heading"
                className="text-xl font-semibold"
              >
                {isLoading
                  ? "Finding recommendations"
                  : movies.length
                    ? "Recommended for you"
                    : "Your recommendations"}
              </h2>
              {!isLoading && movies.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  {movies.length} {movies.length === 1 ? "movie" : "movies"}
                </p>
              )}
            </div>

            <div aria-live="polite" aria-busy={isLoading}>
              {isLoading ? (
                <MovieResultsSkeleton />
              ) : error ? (
                <Alert variant="destructive" role="alert">
                  <AlertTitle>Couldn’t get recommendations</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : movies.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {movies.map((movie, index) => (
                    <MovieCard
                      key={`${movie.title}-${movie.year}`}
                      movie={movie}
                      index={index}
                    />
                  ))}
                </div>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <p className="font-medium">
                      {hasSubmitted
                        ? "No recommendations returned."
                        : "Your picks will show up here."}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Fill in the form to get personalized recommendations.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
