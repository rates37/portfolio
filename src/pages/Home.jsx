import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Loader from "../components/Loader";
import Asteroid from "../models/Asteroid";
import { OrbitControls } from "@react-three/drei";
import Space from "../models/Space";
import ZoomingStarField from "../models/StarField";
import Spaceship from "../models/Spaceship";
import TwinklingZoomingStarField from "../models/StarField";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);

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

  return (
    <section className="w-full h-screen relative">
      {/* Popup: */}
      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        POP
      </div> */}

      {/* 3D Screen */}
      <Canvas
        className={`w-full h-screen bg-black ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
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
            position={shipPosition}
            isRotating={isRotating}
            rotation={[-Math.PI / 2, Math.PI/2, Math.PI/2]}
          />
          <TwinklingZoomingStarField />
          <Asteroid
            position={asteroidPosition}
            scale={asteroidScale}
            rotation={asteroidRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
          />
          {/* <OrbitControls /> */}
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
