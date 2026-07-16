import { Route, HashRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import { About, Projects } from "./pages";
import { Canvas } from "@react-three/fiber";
import TechWireframes from "./models/TechWireframes";
import HomePage from "./pages/BentoHome";

const App = () => {
  return (
    <main className="bg-[#060809]">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        <Canvas
          className="w-full h-full"
          camera={{ near: 0.01, far: 1200, fov: 55 }}
          gl={{ antialias: true }}
        >
          <TechWireframes />
        </Canvas>
      </div>

      <div className="scanlines" />

      <Router>
        {/* NavBar: */}
        <NavBar />

        {/* Routes: */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;