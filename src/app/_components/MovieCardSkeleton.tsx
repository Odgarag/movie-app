import { Skeleton } from '@/components/ui/skelton'

export const MovieCardSkeleton = () => (
  <div className="relative h-[309px] w-[158px] sm:h-[439px] sm:w-[230px] overflow-hidden p-0 rounded-lg border top-80 sm:top-100 container mx-auto">
    <Skeleton className="w-full h-[233px] sm:h-[340px]" />
    <div className="px-4 pt-2">
      <Skeleton className="w-[60px] h-[16px] mb-2" />
      <Skeleton className="w-[100px] h-[18px]" />
    </div>
  </div>
)
