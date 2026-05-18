'use client';

import { useState } from 'react';

interface PhotoGalleryProps {
  photos: { src: string; alt: string }[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {photos.map((photo, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className="relative aspect-[4/3] rounded-lg overflow-hidden bg-amber-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-10 right-0 text-white text-3xl hover:text-amber-300 transition-colors"
              aria-label="Fermer"
            >
              ✕
            </button>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedIndex(selectedIndex > 0 ? selectedIndex - 1 : photos.length - 1)}
                className="text-white text-4xl hover:text-amber-300 transition-colors shrink-0"
                aria-label="Photo précédente"
              >
                ‹
              </button>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                className="rounded-lg max-h-[80vh] w-full object-contain"
              />

              <button
                onClick={() => setSelectedIndex(selectedIndex < photos.length - 1 ? selectedIndex + 1 : 0)}
                className="text-white text-4xl hover:text-amber-300 transition-colors shrink-0"
                aria-label="Photo suivante"
              >
                ›
              </button>
            </div>

            <p className="text-white text-center mt-3 text-sm">
              {photos[selectedIndex].alt} — {selectedIndex + 1}/{photos.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
