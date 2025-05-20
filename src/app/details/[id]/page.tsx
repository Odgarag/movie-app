import { getYouTubeApi } from '@/hooks/GetYouTubeApi'
import { Detail } from '@/app/_components/Detail'
import { getMovieDetailApi } from '@/hooks/getMovieDetailApi'

interface PageProps {
  params: { id: string }
}

const Page = async ({ params }: PageProps) => {
  const { id } = params
  const movie = await getMovieDetailApi(id)
  const trailer = await getYouTubeApi(id)

  return <Detail movie={movie} trailer={trailer} />
}

export default Page
