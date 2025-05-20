'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { MovieCardSkeleton } from '@/app/_components/MovieCardSkeleton'
import { getTopRatingSeeMoreApi } from '@/hooks/GetTopRatingSeeMoreApi'

type UpComingMovie = {
  adult: boolean
  poster_path: string
  id: number
  title: string
  vote_average: number
}

const Page = () => {
  const [upcoming, setUpcoming] = useState<UpComingMovie[]>([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const nowPlaying = async () => {
      setLoading(true)
      const response = await getTopRatingSeeMoreApi({ page })
      const firstTen = response?.results
      setTotalPages(response.total_pages)
      setUpcoming((prev) => ({
        ...prev,
        page: totalPages,
        results: firstTen,
      }))
      setLoading(false)
    }
    nowPlaying()
  }, [page])

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
    <div className="relative top-10 sm:top-20 container mx-auto ">
      <div className="flex mb-[36px] mx-[20px] sm:mx-[0px] sm:[32px]">
        <p className="flex text-[30px]">Top Rating</p>
      </div>
      <div className="container mx-auto gap-[32px] justify-items-center grid grid-cols-2  sm:grid-cols-5">
        {upcoming.results.map((el, index) => (
          <Link href={`./details/${el.id}`} key={index}>
            {' '}
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
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          &lt; Previous
        </button>

        <div className="flex gap-2">
          {[...Array(Math.min(totalPages, 5)).keys()].map((i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1 ? 'bg-black text-white' : ''
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next &gt;
        </button>
      </div>
    </div>
  )
}
export default Page
