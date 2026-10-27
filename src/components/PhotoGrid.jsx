function PhotoGrid({ photos, onSelect, favorites, onToggleFavorite }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
      }}
    >
      {photos.map((photo) => (
        <div key={photo.id} style={{ position: "relative" }}>
          <button
            onClick={() => onSelect(photo.id)}
            style={{
              border: "1px dashed gray",
              height: "220px",
              width: "100%",
              padding: "8px",
              background: "none",
              color: "inherit",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            <p>{photo.title}</p>
            <small>{photo.category}</small>
          </button>
          <button
            onClick={() => onToggleFavorite(photo.id)}
            style={{ position: "absolute", top: "8px", right: "8px" }}
          >
            {favorites.includes(photo.id) ? "★" : "☆"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default PhotoGrid;
