import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { getMoviesByGenre } from '@/hooks/getMoviesByGenre'
import Image from 'next/image'
import Link from 'next/link'

export default async function GenrePage({
  params,
}: {
  params: { id: string }
}) {
  const genreId = parseInt(params.id)
  const movies = await getMoviesByGenre(genreId)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Movies by Genre</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie: any) => (
          <Link
            href={`/details/${movie.id}`}
            key={movie.id}
            className="hover:scale-105 transition"
          >
            <Card className="h-[309px] w-[158px] sm:h-[439px] sm:w-[230px] overflow-hidden p-0">
              <CardContent className="flex items-center justify-center p-0">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt="poster"
                  width={230}
                  height={340}
                  className="w-[158px] h-[210px] sm:w-[230px] sm:h-[340px] object-cover"
                />
              </CardContent>
              <CardDescription className="-mt-[15px] pl-2">
                <div className="flex items-center">
                  <Image src="/Vector.png" width={13} height={13} alt="star" />
                  <p className="ml-1 text-[12px] sm:text-[14px]">
                    {movie.vote_average.toFixed(1)}/10
                  </p>
                </div>
              </CardDescription>
              <CardFooter className="-mt-[20px] pl-2 pb-2">
                <p className="text-[14px] sm:text-[18px] font-medium">
                  {movie.title}
                </p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
