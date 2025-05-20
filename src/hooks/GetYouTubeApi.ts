import axios from 'axios'

type YouTubeVideo = {
  id: string
  key: string
  name: string
  site: string
  type: string
}

type YouTubeApiResponse = {
  id: number
  results: YouTubeVideo[]
}

export const getYouTubeApi = async (
  id: string
): Promise<YouTubeApiResponse | null> => {
  try {
    const result = await axios.get<YouTubeApiResponse>(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8',
        },
      }
    )
    return result.data
  } catch (error) {
    return null
  }
}
