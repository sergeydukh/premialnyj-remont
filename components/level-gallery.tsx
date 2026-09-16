'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type LevelGalleryProps = {
  images: readonly string[]
  initialIndex: number
  levelName: string
  onClose: () => void
  open: boolean
}

export function LevelGallery({ images, initialIndex, levelName, onClose, open }: LevelGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + images.length) % images.length)
  }, [images.length])

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!open) return

    setActiveIndex(initialIndex)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', onKeyDown)
    window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [initialIndex, onClose, open, showNext, showPrevious])

  const currentImage = images[activeIndex]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="level-gallery-title"
          className="level-lightbox fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose()
          }}
        >
          <motion.div
            className="relative flex h-full w-full max-w-7xl items-center justify-center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Закрыть галерею"
              className="absolute right-0 top-0 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition hover:scale-105 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={showPrevious}
              aria-label="Предыдущее фото"
              className="absolute bottom-3 left-[calc(50%-3.5rem)] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition hover:scale-105 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-auto sm:left-0"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden="true" />
            </button>

            <figure className="flex h-full w-full flex-col items-center justify-center gap-3 px-0 pb-16 pt-14 sm:px-16 sm:pb-0 sm:pt-0">
              <div className="relative h-full max-h-[calc(100svh-9rem)] w-full overflow-hidden rounded-2xl">
                <Image
                  key={currentImage}
                  src={currentImage}
                  alt={`${levelName}: фото ${activeIndex + 1}`}
                  fill
                  priority
                  unoptimized
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="flex w-full max-w-5xl items-center justify-between gap-4 text-sm text-white/80">
                <span id="level-gallery-title">{levelName}</span>
                <span aria-live="polite" className="font-mono tabular-nums">
                  {activeIndex + 1} / {images.length}
                </span>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={showNext}
              aria-label="Следующее фото"
              className="absolute bottom-3 right-[calc(50%-3.5rem)] z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white backdrop-blur transition hover:scale-105 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:bottom-auto sm:right-0"
            >
              <ChevronRight className="h-6 w-6" aria-hidden="true" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
