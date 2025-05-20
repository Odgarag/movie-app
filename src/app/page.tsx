import { CarouselPlugin } from './_components/CarouselPlugin'
import { Popular } from './_components/Popular'
import { TopRating } from './_components/TopRating'
import { Upcoming } from './_components/UpComing'

export default function Home() {
  return (
    <div className="z-0">
      <CarouselPlugin />
      <Upcoming />
      <Popular />
      <TopRating />
    </div>
  )
}
