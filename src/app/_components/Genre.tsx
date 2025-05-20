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

export const Genre = ({ visible }: GenreListProps) => {
  if (!visible) return null
  const genre: string[] = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'Film-Noir',
    'Game-Show',
    'History',
    'Horror',
    'Music',
    'Musical',
    'Mystery',
    'News',
    'Reality-TV',
    'Romance',
    'Sci-Fi',
    'Short',
    'Sport',
    'Talk-Show',
    'Thriller',
    'War',
    'western',
  ]
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
            {genre.map((e, ind) => (
              <Badge
                variant={'outline'}
                key={ind}
                className="flex gap-4 border rounded-[100px] pl-[5px] mt-[8px] mr-[10px] text-[12px] items-center"
              >
                <p>{e} </p>
                <ChevronRight width={'15px'} height={'15px'} />
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
