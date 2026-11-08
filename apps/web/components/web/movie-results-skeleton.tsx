import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  count?: number;
};

export function MovieResultsSkeleton({ count = 3 }: Props) {
  return (
    <div
      className="grid gap-4 sm:grid-cols-2"
      role="status"
      aria-live="polite"
      aria-label="Loading movie recommendations"
      aria-busy="true"
    >
      <span className="sr-only">Loading movie recommendations…</span>

      {Array.from({ length: count }, (_, index) => (
        <Card key={index} aria-hidden="true" className="overflow-hidden">
          <Skeleton className="aspect-4/3 w-full rounded-none" />
          <CardHeader className="space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
