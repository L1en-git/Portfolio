import { useState, type KeyboardEvent } from "react";
import "./ProjectGallery.css";
import type { ProjectImage } from "../../data/projects";

interface ProjectGalleryProps {
  images: ProjectImage[];
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function ProjectGallery({ images }: ProjectGalleryProps) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const goTo = (i: number) => setIndex(mod(i, images.length));
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  if (images.length === 0) return null;

  const current = images[index];

  return (
    <div
      className="gallery"
      role="group"
      aria-label="Project screenshots"
      tabIndex={hasMultiple ? 0 : -1}
      onKeyDown={hasMultiple ? onKeyDown : undefined}
    >
      <div className="gallery__frame">
        <img key={current.src} src={current.src} alt={current.alt} className="gallery__image" />

        {hasMultiple && (
          <>
            <button
              type="button"
              className="gallery__arrow gallery__arrow--prev"
              aria-label="Previous image"
              onClick={prev}
            >
              ‹
            </button>
            <button
              type="button"
              className="gallery__arrow gallery__arrow--next"
              aria-label="Next image"
              onClick={next}
            >
              ›
            </button>
            <span className="gallery__count">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          </>
        )}
      </div>

      {hasMultiple && (
        <div className="gallery__dots" role="tablist" aria-label="Select image">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              className={`gallery__dot ${i === index ? "is-active" : ""}`}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
