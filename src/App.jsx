import { useState } from "react";
import { DashboardProvider, useDashboard } from "./context/DashboardContext";
import SearchBar from "./components/SearchBar";
import CategorySection from "./components/CategorySection";

function DashboardContent() {
  const { state } = useDashboard(); // ✅ safe now, inside provider
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  return (
    <div className="app">
      <header className="topbar">
        <h1>Executive Dashboard</h1>
        <SearchBar value={query} onChange={setQuery} placeholder="Search widgets..." />
      </header>

      <div className="categories">
        {state.categories.map((cat) => {
          const visibleWidgets = q
            ? cat.widgets.filter(
                (w) =>
                  w.name.toLowerCase().includes(q) ||
                  w.content.toLowerCase().includes(q)
              )
            : cat.widgets;

          return (
            <CategorySection
              key={cat.id}
              category={cat}
              visibleWidgets={visibleWidgets}
              query={q}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
}
