import { useState, useEffect} from "react";
import type { CSSProperties } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import gsap from "gsap";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  children: React.ReactNode;
}

export function ImageGallery({ images, children }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === 0 ? images.length - 1 : selectedIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        selectedIndex === images.length - 1 ? 0 : selectedIndex + 1
      );
    }
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, images.length]);

  // Animate lightbox in
  useEffect(() => {
    if (selectedIndex === null) return;

    const modal = document.querySelector("[data-lightbox-modal]");
    if (modal) {
      gsap.fromTo(
        modal,
        { opacity: 0, backdropFilter: "blur(0px)" },
        { opacity: 1, backdropFilter: "blur(8px)", duration: 0.3 }
      );
    }
  }, [selectedIndex]);

  return (
    <>
      <div onClick={(e) => {
        if ((e.target as HTMLElement).dataset.galleryClick === "true") {
          const index = parseInt(
            (e.target as HTMLElement).dataset.imageIndex || "-1"
          );
          if (index !== -1) setSelectedIndex(index);
        }
      }}>
        {children}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          data-lightbox-modal
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              aria-label="Close"
            >
              <X size={24} />
            </button>

            {/* Image Container */}
            <div className="relative flex-1 flex items-center justify-center bg-black/90 rounded-lg overflow-hidden">
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="w-full h-full object-contain"
              />

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Caption and Counter */}
            {images.length > 0 && (
              <div className="mt-4 text-center">
                {images[selectedIndex].caption && (
                  <p className="text-white/80 font-sans-body text-sm mb-2">
                    {images[selectedIndex].caption}
                  </p>
                )}
                <p className="text-white/60 font-sans-body text-xs">
                  {selectedIndex + 1} / {images.length}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Helper component for gallery image
export function GalleryImage({
  src,
  alt,
  index,
  className = "",
}: {
  src: string;
  alt: string;
  index: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`relative group cursor-pointer overflow-hidden rounded-lg ${className}`}
      data-gallery-click="true"
      data-image-index={index}
    >
      <img
        src={src}
        alt={alt}
        style={style}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <Maximize2
          size={32}
          className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
