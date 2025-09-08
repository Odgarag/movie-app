'use client'

import Image from 'next/image'
import { Trailer } from './Trailer'
import { SimilarMoviesSkeleton } from './SimilarMoviesSkeleton'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { ArrowRight, Play } from 'lucide-react'
import { PosterBackdropSkeleton } from './PosterBackdropSkeleton'
import { getYouTubeApi } from '@/hooks/GetYouTubeApi'
import { getCreditsApi } from '@/hooks/getCreditsApi'
import { getSimilarMoviesApi } from '@/hooks/getSimilarMoviesApi'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { getCertificationApi } from '@/hooks/getCertificationApi'

export const Detail = ({ movie }: any) => {
  const [similar, setSimilar] = useState([])
  const [credits, setCredits] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [videoKey, setVideoKey] = useState<string | null>(null)
  const [certification, setCertification] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      const cert = await getCertificationApi(movie.id)
      setCertification(cert)
    }

    if (movie?.id) fetchData()
  }, [movie?.id])

  const { resolvedTheme } = useTheme()
  const isDarkThemeActive = resolvedTheme === 'dark'

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const similarData = await getSimilarMoviesApi(movie.id)
        const creditsData = await getCreditsApi(movie.id)
        const isSmallScreen = window.innerWidth < 640
        const count = isSmallScreen ? 2 : 5
        const selected = similarData?.results.splice(0, count)
        setSimilar(selected)
        setCredits(creditsData)
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }

    if (movie?.id) fetchData()
  }, [movie?.id])

  const directors = credits?.crew.filter((c: any) => c.job === 'Director') || []
  const writers =
    credits?.crew.filter((c: any) => c.department === 'Writing') || []
  const stars = credits?.cast.slice(0, 3) || []

  const handleTrailerClick = async (id: number) => {
    const result = await getYouTubeApi(id.toString())

    if (!result || !result.results) {
      console.warn('No trailer data found.')
      return
    }

    const trailer = result.results.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    )

    if (trailer) {
      setVideoKey(trailer.key)
      setIsModalOpen(true)
    } else {
      console.warn('Trailer not found.')
    }
  }

  return (
    <div
      className={`sm:container mx-auto gap-[32px] px-8 py-10 -mb-100 ${
        isDarkThemeActive ? 'dark' : 'light'
      }`}
    >
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-400 mb-4">
            {movie.release_date} • {certification} • {movie.runtime}m
          </p>
        </div>
        <div>
          <p>Rating</p>
          <div className="flex items-center">
            <Image src="/Vector.png" width={24} height={23} alt="star" />
            <p>
              <b>{movie.vote_average.toFixed(1)}</b>
            </p>
            <p className="text-gray-300">/10</p>
            <p>{movie.totalRaters}</p>
          </div>
        </div>
      </div>

      {loading ? (
        <PosterBackdropSkeleton />
      ) : (
        <div className="mx-auto flex flex-col-reverse sm:flex-row gap-8">
          <img
            className="h-[148px] w-[100px] sm:w-[300px] sm:h-[450px] rounded"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="relative">
            <img
              className="rounded-lg h-[211px] sm:h-[450px]"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt="backdrop"
            />
            <div className="flex absolute w-[174px] h-[40px] items-center left-3 z-10 top-[70%] sm:top-[90%] ">
              <button
                onClick={() => handleTrailerClick(movie.id)}
                className="rounded-full shadow bg-white w-[40px] h-[40px] text-black flex items-center justify-center cursor-pointer"
              >
                <Play />
              </button>
              <p className="ml-2">Play Trailer</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-[201px] relative translate-x-3/4 -translate-y-2/5 sm:w-full sm:translate-x-0 sm:translate-y-0">
        <div className="my-4 flex flex-wrap gap-2 ">
          {movie.genres?.map((g: any) => (
            <span
              key={g.id}
              className="bg-background border px-3 rounded-full text-sm"
            >
              {g.name}
            </span>
          ))}
        </div>

        <p className="mb-4 w-full">{movie.overview}</p>
      </div>
      <div className="flex flex-col gap-[20px]">
        <p>
          <strong>Director:</strong>{' '}
          {directors.map((d: any) => d.name).join(', ') || 'N/A'}
        </p>
        <div className="border w-full"></div>
        <p>
          <strong>Writers:</strong>{' '}
          {writers.map((w: any) => w.name).join(', ') || 'N/A'}
        </p>
        <div className="border w-full"></div>

        <p>
          <strong>Stars:</strong>{' '}
          {stars.map((s: any) => s.name).join(', ') || 'N/A'}
        </p>
        <div className="border w-full"></div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between mb-[36px] mx-[20px] sm:mx-[0px] sm:[32px]">
          {' '}
          <h2 className="text-2xl font-semibold mb-4">More like this</h2>
          <Link href={`/details/${movie.id}/similar`}>
            <p className="flex text-sm">
              See more <ArrowRight />
            </p>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {loading ? (
            <SimilarMoviesSkeleton />
          ) : (
            similar.map((m: any) => (
              <Link
                key={m.id}
                href={`./${m.id}`}
                className="hover:scale-105 transition"
              >
                <Card className="h-[309px] w-[158px] sm:h-[439px] sm:w-[230px] overflow-hidden p-0">
                  <CardContent className="flex items-center justify-center p-0">
                    <Image
                      src={`https://image.tmdb.org/t/p/original/${m?.poster_path}`}
                      alt="poster"
                      objectFit="cover"
                      width={230}
                      height={340}
                      className="w-[158px] h-[210px] sm:w-[230px] sm:h-[340px] object-cover"
                    />
                  </CardContent>
                  <CardDescription className="-mt-[15px] pl-2">
                    <div className="flex items-center">
                      <Image
                        src="/Vector.png"
                        width={13}
                        height={13}
                        alt="star"
                      />
                      <p className="ml-1 text-[12px] sm:text-[14px]">
                        {m.vote_average.toFixed(1)}/10
                      </p>
                    </div>
                  </CardDescription>
                  <CardFooter className="-mt-[20px] pl-2 pb-2">
                    <p className="text-[14px] sm:text-[18px] font-medium">
                      {m.title}
                    </p>
                  </CardFooter>
                </Card>
              </Link>
            ))
          )}
        </div>
      </div>

      {isModalOpen && videoKey && (
        <Trailer
          isModalOpen={isModalOpen}
          videoKey={videoKey}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  )
}
