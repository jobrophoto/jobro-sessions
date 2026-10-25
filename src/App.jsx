import { useState } from "react";
import FilterBar from "./components/FilterBar";
import PhotoGrid from "./components/PhotoGrid";
import { photos } from "./data/photos";

function App() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const visiblePhotos =
    activeCategory === "ALL"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  return (
    <main>
      <h1>JOBRO SESSIONS</h1>
      <p>The Archive</p>
      <FilterBar active={activeCategory} onChange={setActiveCategory} />
      <PhotoGrid photos={visiblePhotos} />
    </main>
  );
}

export default App;
