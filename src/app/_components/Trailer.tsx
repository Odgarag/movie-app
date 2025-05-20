import ReactPlayer from 'react-player'

type TrailerProps = {
  isModalOpen: boolean
  videoKey: string | null
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Trailer = ({
  isModalOpen,
  videoKey,
  setIsModalOpen,
}: TrailerProps) => {
  if (!videoKey || !isModalOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-8 0 flex items-center justify-center z-50">
      <div className="relative px-4 ">
        <button
          onClick={() => setIsModalOpen(false)}
          className="cursor-pointer absolute -top-47 right-5 sm:-top-10 sm:-right-35 text-white text-xl font-bold z-50"
        >
          ✕
        </button>
        <div className="w-[375px] h-[212px] sm:h-[561px] sm:w-[997px] ">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            width="100%"
            height="100%"
            controls
          />
        </div>
      </div>
    </div>
  )
}
