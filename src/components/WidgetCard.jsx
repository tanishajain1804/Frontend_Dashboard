import { useDashboard } from "../context/DashboardContext.jsx";

export default function WidgetCard({ widget, categoryId }) {
  const { removeWidget } = useDashboard();

  return (
    <article className="card" role="group" aria-label={widget.name}>
      <button
        className="card__close"
        title="Remove widget"
        aria-label={`Remove ${widget.name}`}
        onClick={() => removeWidget(categoryId, widget.id)}
      >
        ×
      </button>
      <h3 className="card__title">{widget.name}</h3>
      <p className="card__body">{widget.content}</p>
    </article>
  );
}
