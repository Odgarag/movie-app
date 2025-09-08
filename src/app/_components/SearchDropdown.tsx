'use client'

import Link from 'next/link'
import Image from 'next/image'

interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
}

interface Props {
  movies: Movie[]
  searchValue: string
  onSelect: () => void
}

export const SearchDropdown = ({ movies, searchValue, onSelect }: Props) => {
  return (
    <div className="absolute p-[20px] top-10 z-50 -translate-x-1/8 w-[335px] sm:-translate-x-1/5 sm:w-[577px] h-content bg-white dark:bg-zinc-900 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg">
      {movies.length === 0 ? (
        <div className="text-center py-4 text-gray-500 dark:text-gray-400">
          <p className="text-sm">No results found for “{searchValue}”</p>
        </div>
      ) : (
        <>
          {movies.map((movie) => (
            <div key={movie.id}>
              <Link
                href={`/details/${movie.id}`}
                onClick={onSelect}
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
              >
                <Image
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                  width={67}
                  height={100}
                  className="rounded"
                />
                <div className="flex flex-col">
                  <span className="font-semibold">{movie.title}</span>
                  <span className="text-sm text-muted-foreground">
                    ⭐ {movie.vote_average?.toFixed(1)}/10 •{' '}
                    {movie.release_date?.slice(0, 4)}
                  </span>
                </div>
              </Link>
              <div className="border w-full" />
            </div>
          ))}

          <Link
            href={`/search?query=${searchValue}`}
            onClick={onSelect}
            className="block px-4 py-2 text-sm text-blue-500 hover:underline"
          >
            See all results for “{searchValue}”
          </Link>
        </>
      )}
    </div>
  )
}
