function PhotoGrid({ photos, onSelect, favorites, onToggleFavorite }) {
  return (
    <div className="photo-grid">
      {photos.map((photo) => (
        <div key={photo.id} className="tile">
          <button className="tile__open" onClick={() => onSelect(photo.id)}>
            <p className="tile__title">{photo.title}</p>
            <small className="tile__category">{photo.category}</small>
          </button>
          <button
            className="tile__star"
            onClick={() => onToggleFavorite(photo.id)}
          >
            {favorites.includes(photo.id) ? "★" : "☆"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default PhotoGrid;
