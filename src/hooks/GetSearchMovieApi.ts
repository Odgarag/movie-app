import axios from 'axios'

export const searchMovies = async (searchValue: string, page = 1) => {
  if (!searchValue) return { results: [], page: 1, total_pages: 1 }

  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${searchValue}&language=en-US&page=${page}`,
      {
        params: {
          query: searchValue,
          page,
          language: 'en-US',
        },
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjdkOGJlYmQwZjRmZjM0NWY2NTA1Yzk5ZTlkMDI4OSIsIm5iZiI6MTc0MjE3NTA4OS4zODksInN1YiI6IjY3ZDc3YjcxODVkMTM5MjFiNTAxNDE1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KxFMnZppBdHUSz_zB4p9A_gRD16I_R6OX1oiEe0LbE8',
          'Content-Type': 'application/json',
        },
      }
    )

    console.log('✅ TMDB search result:', response.data) // Debug
    return response.data
  } catch (error) {
    console.error('❌ TMDB search error:', error)
    return { results: [], page: 1, total_pages: 1 }
  }
}
