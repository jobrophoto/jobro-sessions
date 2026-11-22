function ReviewSection({ title, onEdit, rows }) {
  return (
    <div className="review">
      <div className="review__head">
        <h4>{title}</h4>
        {onEdit && (
          <button className="link-button" onClick={onEdit}>
            [ EDIT ]
          </button>
        )}
      </div>
      {rows.map((row) => (
        <div key={row.label} className="review__row">
          <span className="review__label">{row.label}</span>
          <span>{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export default ReviewSection;
