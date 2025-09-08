'use client'

import { getUpcomingApi } from '@/hooks/GetUpCominApi'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { MovieCardSkeleton } from './MovieCardSkeleton'
import Link from 'next/link'
import { MovieCard } from './MovieCard'

type UpComingMovie = {
  adult: boolean
  poster_path: string
  id: number
  title: string
  vote_average: number
}

export const Upcoming = () => {
  const [upcoming, setUpcoming] = useState<UpComingMovie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const nowPlaying = async () => {
      setLoading(true)
      const response = await getUpcomingApi()
      const firstTen = response?.results.splice(0, 10)
      setUpcoming(firstTen)
      setLoading(false)
    }
    nowPlaying()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-[32px] top-80 sm:top-100 container mx-auto">
        {[...Array(10)].map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="relative top-80 sm:top-100 container mx-auto ">
      <div className="flex justify-between mb-[36px] mx-[20px] sm:mx-[0px] sm:[32px]">
        <p className="flex text-2xl">Upcoming</p>
        <Link href={'./upcoming'}>
          <p className="flex text-sm">
            See more <ArrowRight />
          </p>
        </Link>
      </div>
      <div className="container mx-auto gap-[32px] justify-items-center grid grid-cols-2  sm:grid-cols-5">
        {upcoming.map((el, index) => (
          <MovieCard el={el} index={index} />
        ))}{' '}
      </div>
    </div>
  )
}
