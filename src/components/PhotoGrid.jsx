function PhotoGrid({ photos }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
      }}
    >
      {photos.map((photo) => (
        <div
          key={photo.id}
          style={{ border: "1px dashed gray", height: "220px", padding: "8px" }}
        >
          <p>{photo.title}</p>
          <small>{photo.category}</small>
        </div>
      ))}
    </div>
  );
}

export default PhotoGrid;
