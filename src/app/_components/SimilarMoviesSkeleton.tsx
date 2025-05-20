'use client'

import { Skeleton } from '@/components/ui/skelton'
import { useEffect, useState } from 'react'

export const SimilarMoviesSkeleton = () => {
  const [count, setCount] = useState(5)

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 640
      setCount(isSmall ? 2 : 5)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative h-[309px] w-[158px] sm:h-[439px] sm:w-[230px] overflow-hidden p-0 rounded-lg border"
        >
          <Skeleton className="w-full h-[233px] sm:h-[340px]" />
          <div className="px-4 pt-2">
            <Skeleton className="w-[60px] h-[16px] mb-2" />
            <Skeleton className="w-[100px] h-[18px]" />
          </div>
        </div>
      ))}
    </>
  )
}
