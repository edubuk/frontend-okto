import { BrowserRouter as  Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CvOutputPage from "./pages/CvOutputPage";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";
import Navbar from "./pages/Navbar";

function App() {

  return (
    <div>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-cv" element={<HomePage />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="cv/:id" element={<CvOutputPage />} />
      </Routes>
    </div>
  );
}

export default App;
