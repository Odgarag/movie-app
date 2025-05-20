import { Skeleton } from '@/components/ui/skelton'

export const OverViewSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-[200px] h-[24px]" />
      <Skeleton className="w-full h-[80px]" />
      <Skeleton className="w-[300px] h-[20px]" />
      <Skeleton className="w-[300px] h-[20px]" />
      <Skeleton className="w-[300px] h-[20px]" />
    </div>
  )
}
