import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-lg shimmer bg-[var(--bg-secondary)]",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="card-base p-5 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3">
        <Skeleton className="h-3 w-1/4" />
        <Skeleton className="h-3 w-1/6" />
        <Skeleton className="h-3 w-1/6" />
        <Skeleton className="h-3 w-1/6" />
        <Skeleton className="h-3 w-1/8 ml-auto" />
      </div>
      {Array(rows).fill(null).map((_, i) => (
        <div key={i} className="card-base flex items-center gap-4 px-4 py-4">
          <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
          <Skeleton className="h-3 flex-1" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-16 rounded-lg ml-auto" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array(4).fill(null).map((_, i) => (
        <div key={i} className="card-base p-5 space-y-3">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  );
}
