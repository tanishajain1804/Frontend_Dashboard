import React, { createContext, useContext, useEffect, useReducer } from "react";

const STORAGE_KEY = "dashboard_state_v1";

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialState = load() || {
  categories: [
    {
      id: "cspm",
      title: "CSPM Executive Dashboard",
      widgets: [
        { id: "w1", name: "Cloud Accounts", content: "Sample content for Cloud Accounts." },
        { id: "w2", name: "Risk Assessment", content: "Latest risks and trends snapshot." },
      ],
    },
    {
      id: "ciem",
      title: "CIEM Executive Dashboard",
      widgets: [
        { id: "w3", name: "User Privileges", content: "Who has access to what and why." },
      ],
    },
  ],
};

const uid = () => Math.random().toString(36).slice(2, 8) + "-" + Date.now().toString(36).slice(-4);

function reducer(state, action) {
  switch (action.type) {
    case "ADD_WIDGET": {
      const { categoryId, widget } = action.payload;
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === categoryId ? { ...c, widgets: [...c.widgets, widget] } : c
        ),
      };
    }
    case "REMOVE_WIDGET": {
      const { categoryId, widgetId } = action.payload;
      return {
        ...state,
        categories: state.categories.map((c) =>
          c.id === categoryId ? { ...c, widgets: c.widgets.filter((w) => w.id !== widgetId) } : c
        ),
      };
    }
    case "ADD_CATEGORY": {
      const { title } = action.payload;
      return {
        ...state,
        categories: [...state.categories, { id: uid(), title, widgets: [] }],
      };
    }
    default:
      return state;
  }
}

const DashboardContext = createContext(null);

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const addWidget = (categoryId, { name, content }) => {
    const widget = { id: uid(), name: (name || "Untitled").trim(), content: (content || "—").trim() };
    dispatch({ type: "ADD_WIDGET", payload: { categoryId, widget } });
  };

  const removeWidget = (categoryId, widgetId) => {
    dispatch({ type: "REMOVE_WIDGET", payload: { categoryId, widgetId } });
  };

  return (
    <DashboardContext.Provider value={{ state, addWidget, removeWidget }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
