import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Asteroid from "../models/Asteroid";
import Spaceship from "../models/Spaceship";
import HomeInfo from "../components/HomeInfo";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [isMouseDown, setisMouseDown] = useState(false);
  const [currentStage, setCurrentStage] = useState(null);

  // Function to adjust the asteroid for ideal screen size
  const adjustAsteroid = () => {
    let screenScale;
    let screenPosition = [0, 2.5, -33];
    let rotation = [0.1, 4.9, -0.1];

    if (window.innerWidth < 786) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  };
  const [asteroidScale, asteroidPosition, asteroidRotation] = adjustAsteroid();

  const adjustShip = () => {
    let screenScale = window.innerWidth < 768 ? 0.005 : 0.01;
    let screenPosition = window.innerWidth < 768 ? [0, 5, -10] : [0, 8, -15];

    return [screenScale, screenPosition];
  };
  const [shipScale, shipPosition] = adjustShip();

  const [hasInteracted, setHasInteracted] = useState(false);

  return (
    <section className="w-full h-screen relative">
      {/* Popup: */}
      <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        {currentStage && <HomeInfo currentStage={currentStage} />}
      </div>

      {/* Instruction Popup */}
      {!hasInteracted && (
        <div className="absolute bottom-10 left-10 z-10 bg-zinc-800/70 backdrop-blur-sm rounded-lg p-3 text-white text-sm italic">
          Click and drag to rotate the asteroid to reveal things about me!
        </div>
      )}

      {/* 3D Screen */}
      <Canvas
        className={`w-full h-screen  ${
          isMouseDown ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.01, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[-10, 5, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={0.5}
          />
          <Spaceship
            scale={shipScale}
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, Math.PI / 2, Math.PI / 2]}
            orbitCenter={asteroidPosition}
            orbitRadius={15}
          />
          <Asteroid
            position={asteroidPosition}
            scale={asteroidScale}
            rotation={asteroidRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            isMouseDown={isMouseDown}
            setIsMouseDown={setisMouseDown}
            setCurrentStage={setCurrentStage}
            hasInteracted={hasInteracted}
            setHasInteracted={setHasInteracted}
          />
          {/* <OrbitControls /> */}
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
