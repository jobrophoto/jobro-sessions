import { useState } from "react";
import FilterBar from "./components/FilterBar";
import PhotoGrid from "./components/PhotoGrid";
import Lightbox from "./components/Lightbox";
import { photos } from "./data/photos";

function App() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [openIndex, setOpenIndex] = useState(null);

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

  return (
    <main>
      <h1>JOBRO SESSIONS</h1>
      <p>The Archive</p>
      <FilterBar active={activeCategory} onChange={setActiveCategory} />
      <PhotoGrid photos={visiblePhotos} onSelect={handleSelect} />
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
