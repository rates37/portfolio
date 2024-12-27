import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

const ZoomingStarField = () => {
  const [stars, setStars] = useState(null);
  const starRef = useRef();

  useEffect(() => {
    // Number of stars
    const starCount = 10000;

    // Create a geometry for stars
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const velocities = new Float32Array(starCount * 3); // For tracking the speed of each star

    for (let i = 0; i < starCount; i++) {
      // Random positions for each star in 3D space
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = Math.random() * 5000 - 5000; // Start the stars far behind the camera
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Random velocities for each star (this controls the speed of each star)
      velocities[i * 3] = Math.random() * 0.5 + 0.5; // Velocity in X direction
      velocities[i * 3 + 1] = Math.random() * 0.5 + 0.5; // Velocity in Y direction
      velocities[i * 3 + 2] = Math.random() * 1 + 1; // Velocity in Z direction (stars closer to us move faster)
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3)); // Add velocities attribute to geometry

    // Create a material for the stars
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
      sizeAttenuation: true,
      transparent: true,
    });

    // Create the Points object to represent the stars
    const points = new THREE.Points(geometry, material);
    starRef.current = points;
    setStars(points);
  }, []);

  useFrame(() => {
    if (!stars) return;

    const positions = starRef.current.geometry.attributes.position.array;
    const velocities = starRef.current.geometry.attributes.velocity.array;

    // Loop over all stars
    for (let i = 0; i < positions.length; i += 3) {
      // Update positions along Z-axis to make stars move towards the camera
      positions[i + 2] += velocities[i + 2]; // Move star along the Z axis

      // Reset star position if it comes too close (to create the illusion of stars coming toward us infinitely)
      if (positions[i + 2] > 0) {
        positions[i + 2] = Math.random() * -5000 - 1000; // Reset the star to the far end
      }
    }

    // Update the positions in the geometry to reflect the changes
    starRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!stars) return null; // If stars are not created yet, render nothing

  return <primitive object={stars} />;
};

const RotatingStarField = () => {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    // Number of stars
    const starCount = 10000;

    // Create a geometry for stars
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      // Random positions for each star in 3D space
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create a material for the stars
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.7,
      sizeAttenuation: true,
      transparent: true,
    });

    // Create the Points object to represent the stars
    const stars = new THREE.Points(geometry, material);

    setStars(stars);
  }, []);

  useFrame(() => {
    // We can add a simple rotation to the star field for animation
    if (stars) {
      stars.rotation.x += 0.0001;
      stars.rotation.y += 0.0001;
    }
  });

  if (!stars) {
    return null; // If stars are not created yet, render nothing
  }

  return <primitive object={stars} />;
};

export default ZoomingStarField;
