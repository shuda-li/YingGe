import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import FaceGenerator from "@/pages/FaceGenerator";
import CostumeChanger from "@/pages/CostumeChanger";
import Gallery from "@/pages/Gallery";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/face-generator" element={<FaceGenerator />} />
        <Route path="/costume-changer" element={<CostumeChanger />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}
