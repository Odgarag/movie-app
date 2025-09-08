'use client'

import { useEffect, useState } from 'react'
import { MovieCardSkeleton } from '@/app/_components/MovieCardSkeleton'
import { getPopularApi } from '@/hooks/GetPopularApi'
import { MovieCard } from '../_components/MovieCard'

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
  const [totalPages, setTotalPages] = useState<number>()

  useEffect(() => {
    const nowPlaying = async () => {
      setLoading(true)
      const response = await getPopularApi({ page })
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

  console.log(page)

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-[32px] top-80 sm:top-100 container mx-auto">
        {[...Array(20)].map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="relative top-10 sm:top-20 container mx-auto ">
      <div className="flex mb-[36px] mx-[20px] sm:mx-[0px] sm:[32px]">
        <p className="flex text-[30px]">Popular</p>
      </div>
      <div className="container mx-auto gap-[32px] justify-items-center grid grid-cols-2  sm:grid-cols-5">
        {upcoming.results.map((el, index) => (
          <MovieCard el={el} index={index} />
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
