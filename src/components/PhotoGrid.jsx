function PhotoGrid({ photos, onSelect }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
      }}
    >
      {photos.map((photo) => (
        <button
          key={photo.id}
          onClick={() => onSelect(photo.id)}
          style={{
            border: "1px dashed gray",
            height: "220px",
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
      ))}
    </div>
  );
}

export default PhotoGrid;
