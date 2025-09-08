'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronDown, Film, Moon, Search, Sun, X } from 'lucide-react'
import { Genre } from './Genre'
import { useDebounce } from '@/hooks/useDebounce'
import { searchMovies } from '@/hooks/GetSearchMovieApi'
import { SearchDropdown } from './SearchDropdown'

export const Header = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const isDarkThemeActive = resolvedTheme === 'dark'
  const toggleTheme = () => setTheme(isDarkThemeActive ? 'light' : 'dark')

  const [showGenre, setShowGenre] = useState(false)
  const [searchActive, setSearchActive] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef(null)
  const genreRef = useRef(null)
  const debouncedSearch = useDebounce(searchValue, 500)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !(searchRef.current as any).contains(event.target)
      ) {
        setSearchActive(false)
      }

      if (
        genreRef.current &&
        !(genreRef.current as any).contains(event.target)
      ) {
        setShowGenre(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const fetchSearch = async () => {
      if (debouncedSearch.trim()) {
        const data = await searchMovies(debouncedSearch)
        setSearchResults(data.results.slice(0, 5))
      } else {
        setSearchResults([])
      }
    }

    fetchSearch()
  }, [debouncedSearch])

  const clearSearch = () => setSearchValue('')

  return (
    <div className="flex items-center mt-3 relative bg-background z-10 px-3 sm:justify-around sm:px-20">
      <div
        className="hidden sm:flex gap-2 items-center sm:gap-[200px]"
        ref={searchRef}
      >
        <Link href={'../'}>
          <div
            className={`flex gap-2 items-center ${
              isDarkThemeActive ? 'text-white' : 'text-indigo-700'
            }`}
          >
            <Film />
            <p className="w-[64px] font-bold italic">Movie Z</p>
          </div>
        </Link>
        <div className="flex gap-2">
          <Button
            variant={'outline'}
            onClick={() => setShowGenre(!showGenre)}
            className="border border-gray-400"
          >
            <ChevronDown className="mr-1" />
            Genre
          </Button>
          <div className="relative flex items-center border rounded-md h-9 px-2 border-gray-400 shadow-xs outline-none">
            <Search className="cursor-pointer text-muted-foreground" />
            <input
              placeholder="Search movies..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="border-none focus:outline-none focus:ring-0 sm:w-[380px]"
            />
            {searchResults.length > 0 && (
              <SearchDropdown
                movies={searchResults}
                searchValue={searchValue}
                onSelect={() => setSearchValue('')}
              />
            )}
          </div>
        </div>
      </div>

      <Button
        variant={'outline'}
        size="icon"
        onClick={toggleTheme}
        className=" flex border border-gray-400 items-center place-items-center ml-3 hidden sm:block"
      >
        {isDarkThemeActive ? <Sun /> : <Moon />}
      </Button>

      <div
        className="sm:hidden flex items-center justify-between w-full mt-2"
        ref={searchRef}
      >
        {searchActive ? (
          <div className="flex items-center gap-2 w-full px-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowGenre(!showGenre)}
              className="border border-gray-400"
            >
              <ChevronDown />
            </Button>
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-8 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-0"
              />
              {searchResults.length > 0 && (
                <SearchDropdown
                  movies={searchResults}
                  searchValue={searchValue}
                  onSelect={() => setSearchValue('')}
                />
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchActive(false)}
            >
              <X />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full px-2">
            <Link href={'../'}>
              <div className="flex gap-2 items-center text-indigo-700">
                <Film />
                <p className="w-[64px] font-bold italic">Movie Z</p>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSearchActive(true)}
                className="border border-gray-400"
              >
                <Search />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleTheme}
                className="border border-gray-400"
              >
                {isDarkThemeActive ? <Sun /> : <Moon />}
              </Button>
            </div>
          </div>
        )}
      </div>

      {showGenre && (
        <div
          className="absolute bg-white dark:bg-zinc-900 -translate-x-0/1 translate-y-5/9 sm:translate-x-14 sm:translate-y-48 z-50 shadow-md rounded-md border"
          ref={genreRef}
        >
          <Genre visible={showGenre} />
        </div>
      )}
    </div>
  )
}
