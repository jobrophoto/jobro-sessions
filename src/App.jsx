import { useState } from "react";
import FilterBar from "./components/FilterBar";
import PhotoGrid from "./components/PhotoGrid";
import Lightbox from "./components/Lightbox";
import { photos } from "./data/photos";

function App() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [openIndex, setOpenIndex] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const visiblePhotos =
    activeCategory === "ALL"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  function handleSelect(id) {
    setOpenIndex(visiblePhotos.findIndex((photo) => photo.id === id));
  }
  function close() {
    setOpenIndex(null);
  }
  function prev() {
    setOpenIndex((i) => (i - 1 + visiblePhotos.length) % visiblePhotos.length);
  }
  function next() {
    setOpenIndex((i) => (i + 1) % visiblePhotos.length);
  }
  function toggleFavorite(id) {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  }

  return (
    <main>
      <h1>JOBRO SESSIONS</h1>
      <p>The Archive</p>
      <p>Saved: {favorites.length}</p>
      <FilterBar active={activeCategory} onChange={setActiveCategory} />
      <PhotoGrid
        photos={visiblePhotos}
        onSelect={handleSelect}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
      {openIndex !== null && (
        <Lightbox
          photos={visiblePhotos}
          index={openIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </main>
  );
}

export default App;
