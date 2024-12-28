/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: drei.lu (https://sketchfab.com/drei.lu)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/space-exploration-wlp-series-8-91964c1ce1a34c3985b6257441efa500
Title: Space exploration [WLP series #8]
*/

import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";

import asteroid from "../assets/3d/asteroid.glb";

const Asteroid = ({ isRotating, setIsRotating, ...props }) => {
  const { nodes, materials } = useGLTF(asteroid);
  const asteroidRef = useRef();
  const { gl, viewport } = useThree();

  const lastX = useRef(0);
  const rotSpeed = useRef(0);
  const dampingFactor = 0.95;

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating) {

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      asteroidRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;
  
      rotSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      asteroidRef.current.rotation.y += 0.01 * Math.PI;
    } else if (e.key === "ArrowRight") {
      if (!isRotating) setIsRotating(true);
      asteroidRef.current.rotation.y -= 0.01 * Math.PI;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      if (isRotating) setIsRotating(false);
    }
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!isRotating) {
      rotSpeed.current *= dampingFactor;
      asteroidRef.current.rotation.y += rotSpeed.current;

      if (Math.abs(rotSpeed.current) < 0.001) {
        rotSpeed.current = 0;
      }

      asteroidRef.current.rotation.y += rotSpeed.current;
    } else {
      const rotation = asteroidRef.current.rotation.y;
      const normalisedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      // if (normalisedRotation >= 5.45 && normalisedRotation <= 5.85) {
      //   setCurrentStage(4);
      // } else if (normalisedRotation >= 0.85 && normalisedRotation <= 1.3) {
      //   setCurrentStage(3);
      // } else if (normalisedRotation >= 2.4 && normalisedRotation <= 2.6) {
      //   setCurrentStage(2);
      // } else if (normalisedRotation >= 4.25 && normalisedRotation <= 4.75) {
      //   setCurrentStage(1);
      // } else {
      //   setCurrentStage(null);
      // }
    }
  })

  return (
    <a.group ref={asteroidRef} {...props}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group
          position={[-0.003, 0.024, -6.331]}
          rotation={[0.238, -0.7545, 0.562]}
          scale={8}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.planet001_1.geometry}
            material={materials.scene}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.planet001_2.geometry}
            material={materials.scene}
          />
        </group>
      </group>
    </a.group>
  );
};

export default Asteroid;
