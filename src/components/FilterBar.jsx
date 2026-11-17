const categories = ["ALL", "PORTRAITS", "BRAND", "PRODUCT"];

function FilterBar({ active, onChange }) {
  return (
    <div className="filter-bar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          className={active === category ? "chip chip--active" : "chip"}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
