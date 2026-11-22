import { useEffect } from "react";

function Lightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
  favorites,
  onToggleFavorite,
}) {
  const photo = photos[index];

  useEffect(() => {
    function handleKey(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lightbox">
      <button className="lightbox__close" onClick={onClose}>
        x
      </button>
      <p>
        {index + 1} / {photos.length}
      </p>
      <button
        className="lightbox__star"
        onClick={() => onToggleFavorite(photo.id)}
      >
        {favorites.includes(photo.id) ? "★" : "☆"}
      </button>
      <div className="lightbox__image">IMAGE</div>
      <h2>{photo.title}</h2>
      <p>
        {photo.date} · {photo.category}
      </p>
      <div className="lightbox__arrows">
        <button className="lightbox__nav" onClick={onPrev}>
          &lt;
        </button>
        <button className="lightbox__nav" onClick={onNext}>
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Lightbox;
