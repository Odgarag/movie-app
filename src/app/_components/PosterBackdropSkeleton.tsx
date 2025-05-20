import { Skeleton } from '@/components/ui/skelton'

export const PosterBackdropSkeleton = () => {
  return (
    <div className="mx-auto flex flex-col md:flex-row gap-8">
      <Skeleton className="h-[450px] w-[300px] rounded" />
      <Skeleton className="h-[450px] w-[600px] rounded" />
    </div>
  )
}
