import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app";

import '@fontsource/roboto/latin-ext.css';
import '@fontsource/roboto/cyrillic.css';
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
