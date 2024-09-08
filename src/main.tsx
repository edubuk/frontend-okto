import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CvFomContextProvider } from "./context/CvForm.context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CvFomContextProvider>
      <App />
    </CvFomContextProvider>
  </StrictMode>
);
