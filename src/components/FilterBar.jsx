const categories = ["ALL", "PORTRAITS", "BRAND", "PRODUCT"];

function FilterBar({ active, onChange }) {
  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)}
          style={{
            border: active === category ? "2px solid white" : "1px solid gray",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
