'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { getPopularApi } from '@/hooks/GetPopularApi'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { MovieCardSkeleton } from './MovieCardSkeleton'
import Link from 'next/link'

type UpComingMovie = {
  adult: boolean
  poster_path: string
  id: number
  title: string
  vote_average: number
}

export const Popular = () => {
  const [popular, setPopular] = useState<UpComingMovie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const nowPlaying = async () => {
      setLoading(true)
      const response = await getPopularApi()
      const firstTen = response?.results.splice(0, 10)
      setPopular(firstTen)
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
    <div className="relative top-80 container mx-auto mt-[52px] sm:top-100">
      <div className="flex justify-between mb-[36px] mx-[20px] sm:mx-[0px] sm:[32px]">
        <p className="flex text-2xl">Popular</p>
        <Link href={'./popular'}>
          <p className="flex text-sm">
            See more <ArrowRight />
          </p>
        </Link>
      </div>
      <div className="container mx-auto gap-[32px] justify-items-center grid grid-cols-2  sm:grid-cols-5">
        {popular.map((el, index) => (
          <Link href={`./details/${el.id}`} key={index}>
            <Card
              key={index}
              className="h-[309px] w-[158px] sm:h-[439px] sm:w-[230px] overflow-hidden p-0"
            >
              <CardContent className="flex items-center justify-center p-0">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${el?.poster_path}`}
                  alt="poster"
                  objectFit="cover"
                  width={230}
                  height={340}
                  className="w-[158px] h-[210px] sm:w-[230px] sm:h-[340px] object-cover"
                />
              </CardContent>
              <CardDescription className="-mt-[15px] pl-2">
                <div className="flex items-center">
                  <Image src="/Vector.png" width={13} height={13} alt="star" />
                  <p className="ml-1 text-[12px] sm:text-[14px]">
                    {el.vote_average.toFixed(1)}/10
                  </p>
                </div>
              </CardDescription>
              <CardFooter className="-mt-[20px] pl-2 pb-2">
                <p className="text-[14px] sm:text-[18px] font-medium">
                  {el.title}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}{' '}
      </div>
    </div>
  )
}
