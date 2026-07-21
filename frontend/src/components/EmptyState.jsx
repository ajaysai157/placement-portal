import "./EmptyState.css";

function EmptyState({
  title,
  description,
}) {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        📂
      </div>

      <h2>{title}</h2>

      <p>{description}</p>

    </div>
  );
}

export default EmptyState;