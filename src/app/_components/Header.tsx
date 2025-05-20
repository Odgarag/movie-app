'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronDown, Film, Moon, Search, Sun, X } from 'lucide-react'
import { Genre } from './Genre'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import Link from 'next/link'

export const Header = () => {
  const { setTheme, resolvedTheme } = useTheme()
  const isDarkThemeActive = resolvedTheme === 'dark'
  const toggleTheme = () => setTheme(isDarkThemeActive ? 'light' : 'dark')

  const [showGenre, setShowGenre] = useState(false)
  const [searchActive, setSearchActive] = useState(false)

  return (
    <div className="flex items-center mt-[11.5px] z-20 relative bg-background z-10 px-[11.5px] sm:justify-around sm:px-[80px]">
      {!searchActive ? (
        <>
          <Link href={'../'}>
            <div
              className={`flex gap-2 justify-start ${
                isDarkThemeActive ? 'text-white-900' : 'text-indigo-700'
              }`}
            >
              <Film />
              <p className="w-[64px]">
                <i>
                  <b>Movie Z</b>
                </i>
              </p>
            </div>
          </Link>
          <div className="flex gap-2 w-full justify-end sm:justify-center">
            <Button
              variant={'outline'}
              onClick={() => setShowGenre(!showGenre)}
              className="border border-gray-400 hidden sm:flex"
            >
              <ChevronDown className="mr-1" />
              Genre
            </Button>
            <div className="flex items-center sm:flex border rounded-[7px] h-[36px] px-2 border-gray-400 shadow-xs focus-within:outline-none focus-within:ring-0 focus-within:ring-transparent">
              <Search
                className="cursor-pointer"
                onClick={() => setSearchActive(true)}
              />
              <Input
                placeholder="Search.."
                className="border-none focus:outline-none focus:ring-0 focus:ring-transparent focus-visible:ring-0 hidden sm:w-[380px] sm:flex"
              />
            </div>
          </div>

          <Button
            variant={'outline'}
            size="icon"
            onClick={toggleTheme}
            className="border border-gray-400 ml-[12px] sm:ml-[0px]"
          >
            {isDarkThemeActive ? <Sun /> : <Moon />}
          </Button>
        </>
      ) : (
        <div className="flex justify-between items-center w-full px-2">
          <div className="flex items-center gap-2 w-full">
            <Button
              variant="outline"
              size="icon"
              className="border border-gray-400"
              onClick={() => setShowGenre(!showGenre)}
            >
              <ChevronDown />
            </Button>
            <div className="relative w-full">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search"
                className="pl-8 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-0"
              />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchActive(false)}
          >
            <X />
          </Button>
        </div>
      )}

      <div className="absolute bg-white translate-x-2 translate-y-73 sm:translate-x-14 sm:translate-y-48">
        <Genre visible={showGenre} />
      </div>
    </div>
  )
}
