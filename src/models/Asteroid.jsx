/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: drei.lu (https://sketchfab.com/drei.lu)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/space-exploration-wlp-series-8-91964c1ce1a34c3985b6257441efa500
Title: Space exploration [WLP series #8]
*/

import React, { useRef, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { a } from "@react-spring/three";

import asteroid from "../assets/3d/asteroid.glb";

const Asteroid = ({
  isRotating,
  setIsRotating,
  isMouseDown,
  setIsMouseDown,
  setCurrentStage,
  ...props
}) => {
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
    setIsMouseDown(true);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
    setIsMouseDown(false);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (isRotating && isMouseDown) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      asteroidRef.current.rotation.y += delta * 0.01 * Math.PI;
      lastX.current = clientX;

      rotSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      rotSpeed.current -= 0.0125 / 3;
    } else if (e.key === "ArrowRight") {
      rotSpeed.current += 0.0125 / 3;
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      if (isRotating) setIsRotating(false);
    }
  };

  const handleWheel = (e) => {
    e.stopPropagation();
    e.preventDefault();

    // Use e.deltaY to determine scroll direction
    const scrollDirection = e.deltaY > 0 ? 1 : -1;
    rotSpeed.current += scrollDirection * 0.001 * Math.PI; // Increase rotation speed with scroll
  };

  const handleTouchStart = (e) => {
    handlePointerDown(e);
  };

  const handleTouchMove = (e) => {
    handlePointerMove(e);
  };

  const handleTouchEnd = (e) => {
    handlePointerUp(e);
  };

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("wheel", handleWheel);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("pointerleave", handlePointerUp);

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("pointerleave", handlePointerUp);

      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerUp, handlePointerMove]);

  useFrame(() => {
    if (!isRotating) {
      rotSpeed.current *= dampingFactor;
      asteroidRef.current.rotation.y += rotSpeed.current;

      if (Math.abs(rotSpeed.current) < 0.001) {
        rotSpeed.current = 0;
        setIsRotating(false);
      }

      asteroidRef.current.rotation.y += rotSpeed.current;
    }
    const rotation = asteroidRef.current.rotation.y;
    const normalisedRotation =
      ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    // console.log(normalisedRotation)
    // if (normalisedRotation >= 5.45 && normalisedRotation <= 5.85) {
    //   setCurrentStage(4);
    // } else

    if (normalisedRotation >= 0 && normalisedRotation <= 1.25) {
      setCurrentStage(3);
    } else if (normalisedRotation >= 2.25 && normalisedRotation <= 3.5) {
      setCurrentStage(2);
    } else if (normalisedRotation >= 4.25 && normalisedRotation <= 5.5) {
      setCurrentStage(1);
    } else {
      setCurrentStage(null);
    }
  });

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
