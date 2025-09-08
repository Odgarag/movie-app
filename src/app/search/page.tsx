'use client'

import { useEffect, useState } from 'react'
import { searchMovies } from '@/hooks/GetSearchMovieApi'
import { useSearchParams } from 'next/navigation'
import { MovieCardSkeleton } from '../_components/MovieCardSkeleton'
import { MovieCard } from '../_components/MovieCard'

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
}

const SearchPage = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ''
  const page = parseInt(searchParams.get('page') || '1')

  const [results, setResults] = useState<Movie[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      if (!query) return
      const data = await searchMovies(query, page)
      setResults(data.results || [])
      setTotalPages(data.total_pages || 1)
      setLoading(false)
    }
    fetchData()
  }, [query, page])
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
    <div className="relative container mx-auto mt-[52px]">
      <h1 className="text-2xl font-bold text-white mb-2">Search results</h1>
      <p className="text-white mb-4">
        {results.length} results for “{query}”
      </p>

      {results.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-lg">
          No results found for “{query}”.
        </div>
      ) : (
        <>
          <div className="container mx-auto gap-[32px] justify-items-center grid grid-cols-2  sm:grid-cols-5">
            {results.map((el, index) => (
              <MovieCard el={el} index={index} />
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-4 text-white">
            {page > 1 && (
              <a
                href={`/search?query=${query}&page=${page - 1}`}
                className="hover:underline"
              >
                ‹ Previous
              </a>
            )}
            <span className="font-bold">{page}</span>
            {page < totalPages && (
              <a
                href={`/search?query=${query}&page=${page + 1}`}
                className="hover:underline"
              >
                Next ›
              </a>
            )}
          </div>
        </>
      )}
    </div>
  )
}
export default SearchPage
