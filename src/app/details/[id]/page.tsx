import { getYouTubeApi } from '@/hooks/GetYouTubeApi'
import { Detail } from '@/app/_components/Detail'
import { getMovieDetailApi } from '@/hooks/getMovieDetailApi'

type Params = { id: string }

async function PageContent({ id }: Params) {
  const movie = await getMovieDetailApi(id)
  const trailer = await getYouTubeApi(id)

  return <Detail movie={movie} trailer={trailer} />
}

export default function Page({ params }: { params: Params }) {
  return <PageContent id={params.id} />
}
