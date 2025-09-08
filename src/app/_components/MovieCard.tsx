import {
  CardContent,
  CardDescription,
  Card,
  CardFooter,
} from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'

export const MovieCard = ({ el, index }: any) => {
  return (
    <Link
      href={`./details/${el.id}`}
      key={index}
      className="hover:scale-105 transition"
    >
      {' '}
      <Card
        key={index}
        className="h-[309px] w-[158px] sm:h-[439px] sm:w-[230px] overflow-hidden p-0"
      >
        <CardContent className="flex items-center justify-center p-0">
          <Image
            src={`https://image.tmdb.org/t/p/original/${el?.poster_path}`}
            alt="poster"
            objectFit="cover"
            width={230}
            height={340}
            className="w-[158px] h-[210px] sm:w-[230px] sm:h-[340px] object-cover"
          />
        </CardContent>
        <CardDescription className="-mt-[15px] pl-2">
          <div className="flex items-center">
            <Image src="/Vector.png" width={13} height={13} alt="star" />
            <p className="ml-1 text-[12px] sm:text-[14px]">
              {el.vote_average.toFixed(1)}/10
            </p>
          </div>
        </CardDescription>
        <CardFooter className="-mt-[20px] pl-2 pb-2">
          <p className="text-[14px] sm:text-[18px] font-medium">{el.title}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}
