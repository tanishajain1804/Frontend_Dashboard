import { useState } from "react";
import { useDashboard } from "../context/DashboardContext";

export default function AddWidgetModal({ categoryId, onClose }) {
  const { addWidget } = useDashboard();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    addWidget(categoryId, { name, content });
    onClose();
  }

  return (
    <div className="modal__backdrop" onClick={onClose} role="presentation">
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="addWidgetTitle"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="addWidgetTitle">Add Widget</h2>
        <form onSubmit={handleSubmit} className="modal__form">
          <label className="label">
            <span>Widget Name</span>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Resources by Severity"
              required
            />
          </label>

          <label className="label">
            <span>Widget Content</span>
            <textarea
              className="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Short description or any text"
              rows={4}
            />
          </label>

          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
