'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { getHeroApi } from '@/hooks/GetHeroApi'
import { getYouTubeApi } from '@/hooks/GetYouTubeApi'
import { CarouselPluginSkeleton } from './CarouselPluginSkeleton'
import { Trailer } from './Trailer'
import { useTheme } from 'next-themes'
import Link from 'next/link'

type UpComingMovie = {
  adult: boolean
  backdrop_path: string
  id: number
  title: string
  overview: string
  vote_average: number
}

export const CarouselPlugin = () => {
  const [upcoming, setUpcoming] = useState<UpComingMovie[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [videoKey, setVideoKey] = useState<string | null>(null)
  const { setTheme, resolvedTheme } = useTheme()
  const isDarkThemeActive = resolvedTheme === 'dark'
  const toggleTheme = () => setTheme(isDarkThemeActive ? 'light' : 'dark')

  useEffect(() => {
    const nowPlaying = async () => {
      setLoading(true)
      const response = await getHeroApi()
      const firstFive = response?.results.splice(0, 5)
      setUpcoming(firstFive)
      setLoading(false)
    }

    nowPlaying()
  }, [])

  const handleTrailerClick = async (id: number, title: string) => {
    const result = await getYouTubeApi(id.toString())

    if (!result || !result.results) {
      console.warn('No trailer data found for this movie.')
      return
    }

    const trailer = result.results.find(
      (v) => v.type === 'Trailer' && v.site === 'YouTube'
    )

    if (trailer) {
      setVideoKey(trailer.key)

      setIsModalOpen(true)
    } else {
      console.warn('Тухайн киноны трайлер олдсонгүй..')
    }
  }
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  if (loading) return <CarouselPluginSkeleton />

  return (
    <div className="w-full mt-[10px]">
      <Carousel
        plugins={[plugin.current]}
        className="w-full h-[260px]"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {upcoming?.map((el, index) => (
            <CarouselItem key={index}>
              <div
                className={`relative h-[535px] ${
                  isDarkThemeActive ? 'light' : 'dark'
                } sm:text-white sm:h-[600px]`}
              >
                <div className="relative h-[246px] w-full object-cover p-none sm:h-[600px]">
                  <Link href={`./details/${el.id}`} key={index}>
                    <Image
                      src={`https://image.tmdb.org/t/p/original/${el?.backdrop_path}`}
                      fill
                      alt="hero"
                      objectFit="cover"
                    />
                  </Link>
                </div>
                <div className="absolute flex flex-col z-3 top-65 pl-[15px] pr-[15px] sm:top-[178px] sm:pl-[140px] sm:w-[404px]">
                  <div className="flex justify-between sm:flex-col">
                    <div>
                      <p className="text-[14px]">Now Playing:</p>
                      <p className="text-[24px]">{el.title}</p>
                    </div>
                    <div className="flex items-center">
                      <Image
                        src="/Vector.png"
                        width={23}
                        height={23}
                        alt="star"
                      />
                      <p>
                        <b>{el.vote_average.toFixed(1)}</b>
                      </p>
                      <p className="text-gray-300">/10</p>
                    </div>
                  </div>
                  <p className="text-[14px] mt-[4px] sm:mt-[16px] mb-[16px]">
                    {el.overview}
                  </p>
                  <button
                    onClick={() => handleTrailerClick(el.id, el.title)}
                    className="cursor-pointer border h-[40px] w-[145px] text-black bg-white rounded-[8px] flex items-center justify-center gap-[11px]"
                  >
                    <Play /> Watch Trailer
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute top-80 left-15 z-10 bg-white hidden sm:flex" />
        <CarouselNext className="absolute top-80 right-15 z-10 bg-white hidden sm:flex" />
      </Carousel>
      <Trailer
        isModalOpen={isModalOpen}
        videoKey={videoKey}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  )
}
