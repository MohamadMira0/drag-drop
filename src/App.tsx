import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/dashboard/Home";
import EditMode from "./pages/dashboard/EditMode";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-mode" element={<EditMode />} />
      </Routes>
    </>
  );
}

export default App;
