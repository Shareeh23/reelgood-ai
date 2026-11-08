import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import type { Movie } from "@/types/movie";

type Props = {
  movie: Movie;
  index: number;
};

export function MovieCard({ movie, index }: Props) {
  return (
    <article>
      <Card className="h-full overflow-hidden bg-card text-card-foreground transition-shadow hover:shadow-lg">
        <div
          className="flex aspect-[4/3] items-end bg-gradient-to-br from-primary/25 via-accent/20 to-secondary p-4"
          aria-hidden="true"
        >
          <span className="rounded-full border border-border bg-background/90 px-3 py-1 text-sm font-semibold text-foreground">
            <span aria-hidden="true">★ </span>
            {movie.rating.toFixed(1)} / 5
          </span>
        </div>

        <CardHeader className="gap-1">
          <h3 className="font-heading text-lg font-medium leading-tight">
            {movie.title}
          </h3>
          <CardDescription>{movie.year}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          <ul
            className="flex flex-wrap gap-2"
            aria-label={`${movie.title} genres`}
          >
            {movie.genre.map((genre) => (
              <li
                key={genre}
                className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs text-secondary-foreground"
              >
                {genre}
              </li>
            ))}
          </ul>

          <p className="leading-relaxed text-card-foreground">{movie.reason}</p>

          {movie.cast.length > 0 && (
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Cast: </span>
              {movie.cast.join(", ")}
            </p>
          )}
        </CardContent>
      </Card>
    </article>
  );
}
