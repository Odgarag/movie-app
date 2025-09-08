import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { getSimilarMoviesApi } from '@/hooks/getSimilarMoviesApi'
import Image from 'next/image'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Movie {
  id: number
  title: string
  poster_path: string | null
  vote_average: number
}

export default async function Similar({ params }: { params: { id: string } }) {
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
    <div className="relative top-10 sm:top-20 container mx-auto">
      <div className="flex mb-[36px] mx-[20px] sm:mx-[0px] sm:[32px]">
        <p className="flex text-[30px]">More Like This</p>
      </div>
      <div className="container mx-auto gap-[32px] justify-items-center grid grid-cols-2 sm:grid-cols-5">
        {similarData.results.map((movie: Movie) => (
          <Link
            key={movie.id}
            href={`/details/${movie.id}`}
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
