'use client'

import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

interface GenreListProps {
  visible: boolean
}

const genreList = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
]

export const Genre = ({ visible }: GenreListProps) => {
  const router = useRouter()
  if (!visible) return null

  return (
    <div className="w-[335px] bg-background sm:w-[577px]">
      <Card className="border-gray-400 shadow-xs">
        <CardHeader>
          <CardTitle>Genres</CardTitle>
          <CardDescription>See lists of movies by genre</CardDescription>
        </CardHeader>
        <div className="border w-[90%] m-auto"></div>
        <CardContent>
          <div className="flex flex-wrap">
            {genreList.map((genre) => (
              <Badge
                variant="outline"
                key={genre.id}
                className="flex gap-4 border rounded-[100px] pl-[5px] mt-[8px] mr-[10px] text-[12px] items-center cursor-pointer"
                onClick={() => router.push(`/genre/${genre.id}`)}
              >
                <p>{genre.name}</p>
                <ChevronRight width="15px" height="15px" />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
