import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import SideBar from "./context/SidebarContext";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <SideBar>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SideBar>
    </DndProvider>
  </StrictMode>
);
