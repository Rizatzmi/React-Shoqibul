import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProjectDetail from "./Pages/Templates/ProjectDetail";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/project/:itemName" element={<ProjectDetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
