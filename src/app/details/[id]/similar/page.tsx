// app/movie/[id]/similar/page.tsx
import { getSimilarMoviesApi } from '@/hooks/getSimilarMoviesApi'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic' // Хуудсыг динамикаар fetch хийх

interface Movie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
}

export default async function similarPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const similarData = await getSimilarMoviesApi(id)

  if (
    !similarData ||
    !similarData.results ||
    similarData.results.length === 0
  ) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">
          No similar movies found.
        </h2>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">More Like This</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {similarData.results.map((movie: Movie) => (
          <Link
            key={movie.id}
            href={`/movie/${movie.id}`}
            className="hover:scale-105 transition"
          >
            <div className="bg-white dark:bg-zinc-800 rounded shadow overflow-hidden">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={300}
                  height={450}
                  className="w-full h-auto"
                />
              ) : (
                <div className="w-full h-[450px] bg-gray-200 flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}
              <div className="p-3">
                <h3 className="text-md font-medium">{movie.title}</h3>
                <p className="text-sm text-yellow-600">
                  ⭐ {movie.vote_average?.toFixed(1) || 'N/A'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
