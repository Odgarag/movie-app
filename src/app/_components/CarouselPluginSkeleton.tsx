import { Skeleton } from '@/components/ui/skelton'

export const CarouselPluginSkeleton = () => {
  return (
    <div className="w-full mt-[10px]">
      <div className="w-full h-[260px]">
        <div className="relative h-[535px] sm:h-[600px]">
          <Skeleton className="absolute h-[246px] w-full sm:h-[600px]" />
          <div className="absolute flex flex-col z-3 top-65 pl-[15px] pr-[15px] sm:top-[178px] sm:pl-[140px] sm:w-[404px]">
            <div className="flex justify-between sm:flex-col gap-2">
              <div>
                <Skeleton className="h-[14px] w-[100px] mb-2" />
                <Skeleton className="h-[24px] w-[200px]" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-[23px] w-[23px] rounded-full" />
                <Skeleton className="h-[16px] w-[40px]" />
              </div>
            </div>
            <Skeleton className="h-[60px] w-full mt-[16px] mb-[16px]" />
            <Skeleton className="h-[40px] w-[145px] rounded-[8px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
