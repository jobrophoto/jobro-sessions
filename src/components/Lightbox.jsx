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
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <button
        onClick={onClose}
        style={{ position: "absolute", top: "16px", right: "16px" }}
      >
        x
      </button>
      <p>
        {index + 1} / {photos.length}
      </p>
      <button
        onClick={() => onToggleFavorite(photo.id)}
        style={{ position: "absolute", top: "8px", left: "8px" }}
      >
        {favorites.includes(photo.id) ? "★" : "☆"}
      </button>
      <div
        style={{
          border: "1px dashed gray",
          width: "min(345px, 90vw)",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        IMAGE
      </div>
      <h2>{photo.title}</h2>
      <p>
        {photo.date} · {photo.category}
      </p>
      <div>
        <button onClick={onPrev}>&lt;</button>
        <button onClick={onNext}>&gt;</button>
      </div>
    </div>
  );
}

export default Lightbox;
