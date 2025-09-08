'use client'

import { getGenres } from '@/hooks/getGenres'
import { useState, useEffect } from 'react'

export default function GenreDropdown() {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    async function fetchGenres() {
      const genreList = await getGenres()
      setGenres(genreList)
    }
    fetchGenres()
  }, [])

  return (
    <div className="relative">
      <button className="px-4 py-2 bg-gray-200 rounded">Genre</button>
      <div className="absolute z-10 mt-2 w-64 bg-white shadow-lg rounded p-4">
        <h3 className="text-lg font-semibold mb-2">Genres</h3>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <button
              key={genre.id}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm"
              onClick={() => handleGenreClick(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  function handleGenreClick(genreId: number) {
    window.location.href = `/genre/${genreId}`
  }
}
