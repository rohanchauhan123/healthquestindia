import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initStore } from "./data/store";

// Load latest CMS data from Supabase before first render
initStore().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});

