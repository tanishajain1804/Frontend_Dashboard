import { useState } from "react";
import AddWidgetModal from "./AddWidgetModal";
import WidgetCard from "./WidgetCard";

export default function CategorySection({ category, visibleWidgets, query }) {
  const [open, setOpen] = useState(false);
  const showEmptyMsg = query && visibleWidgets.length === 0;

  return (
    <section className="category">
      <header className="category__head">
        <h2 className="category__title">{category.title}</h2>
        <button className="btn" onClick={() => setOpen(true)}>+ Add Widget</button>
      </header>

      <div className="widgets">
        {visibleWidgets.map((w) => (
          <WidgetCard key={w.id} widget={w} categoryId={category.id} />
        ))}
        {showEmptyMsg && (
          <p className="muted">No widgets match “{query}” in this category.</p>
        )}
      </div>

      {open && <AddWidgetModal categoryId={category.id} onClose={() => setOpen(false)} />}
    </section>
  );
}
