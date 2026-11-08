import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MovieResultsSkeleton } from "@/components/web/movie-results-skeleton";

export default function Loading() {
  return (
    <main
      className="min-h-screen bg-background text-foreground"
      aria-busy="true"
    >
      <p className="sr-only" role="status">
        Loading movie finder…
      </p>

      <header className="border-b border-border/70">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5"
          aria-label="Main navigation"
        >
          <Skeleton className="h-7 w-28" aria-hidden="true" />
          <Skeleton className="hidden h-4 w-48 sm:block" aria-hidden="true" />
        </nav>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
        <Skeleton className="h-4 w-28" aria-hidden="true" />
        <Skeleton className="mt-4 h-10 w-full max-w-2xl" aria-hidden="true" />

        <div className="mt-10 grid items-start gap-6 md:grid-cols-[minmax(17rem,0.85fr)_minmax(0,1.35fr)]">
          <Card aria-hidden="true">
            <CardHeader>
              <Skeleton className="h-6 w-52" />
            </CardHeader>
            <CardContent className="space-y-5">
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-11 w-full" />
            </CardContent>
          </Card>

          <MovieResultsSkeleton />
        </div>
      </section>
    </main>
  );
}
