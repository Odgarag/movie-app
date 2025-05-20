'use client'

import React from 'react'
import ReactPlayer from 'react-player/youtube'
import { Dialog, DialogContent } from '@/components/ui/dialog'

interface TrailerModalProps {
  open: boolean
  onClose: () => void
  videoKey: string | null
  title: string
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  open,
  onClose,
  videoKey,
  title,
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] w-full">
        <div className="text-white mb-2 font-bold">{title}: Trailer</div>
        {videoKey && (
          <div className="aspect-video w-full">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoKey}`}
              width="100%"
              height="100%"
              controls
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
