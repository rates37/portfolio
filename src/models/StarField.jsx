import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing"; // Import Bloom effect

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

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("velocity", new THREE.BufferAttribute(velocities, 3)); // Add velocities attribute to geometry

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

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

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

const TwinklingStarField = () => {
  const [stars, setStars] = useState(null);
  const starRef = useRef();

  useEffect(() => {
    // Number of stars
    const starCount = 10000;

    // Create a geometry for stars
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const intensities = new Float32Array(starCount); // To hold intensity for each star (for twinkling effect)

    for (let i = 0; i < starCount; i++) {
      // Random positions for each star in 3D space
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = Math.random() * 5000 - 5000; // Start the stars far behind the camera

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Set initial intensities for the twinkling effect (random between 0.5 and 1)
      intensities[i] = Math.random() * 0.5 + 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute(
      "intensity",
      new THREE.BufferAttribute(intensities, 1)
    ); // Add intensity attribute

    // Create custom ShaderMaterial for glow effect
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_PointSize = 5.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vPosition;
        uniform float intensity;
        void main() {
          float dist = length(vPosition);
          float glow = exp(-dist * 0.01) * intensity; // Glow effect based on distance
          gl_FragColor = vec4(glow, glow, glow, 1.0);
        }
      `,
      uniforms: {
        intensity: { value: 1.0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending, // Blending mode to enhance glow effect
    });

    // Create the Points object to represent the stars
    const points = new THREE.Points(geometry, material);
    starRef.current = points;
    setStars(points);
  }, []);

  useFrame(() => {
    if (!stars) return;

    const intensities = starRef.current.geometry.attributes.intensity.array;
    const material = starRef.current.material;

    // Loop through all stars to apply the twinkling effect
    for (let i = 0; i < intensities.length; i++) {
      // Update intensity (opacity) randomly to create twinkling effect
      intensities[i] = Math.random() * 0.8 + 0.2; // Random opacity between 0.2 and 1
    }

    // Update the intensity in the geometry to reflect the changes
    starRef.current.geometry.attributes.intensity.needsUpdate = true;

    // Update the material's intensity to reflect the glow change
    material.uniforms.intensity.value = Math.max(...intensities) * 2;
  });

  if (!stars) return null; // If stars are not created yet, render nothing

  return (
    <>
      <primitive object={stars} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
      </EffectComposer>
    </>
  );
};

// const TwinklingZoomingStarField = () => {
//   const [stars, setStars] = useState(null);
//   const starRef = useRef();
//   const speedScale = 0.2;
//   useEffect(() => {
//     const starCount = 10000;

//     const geometry = new THREE.BufferGeometry();
//     const positions = new Float32Array(starCount * 3);
//     const intensities = new Float32Array(starCount);
//     const velocities = new Float32Array(starCount * 3);

//     for (let i = 0; i < starCount; i++) {
//       const x = (Math.random() - 0.5) * 2000;
//       const y = (Math.random() - 0.5) * 2000;
//       const z = Math.random() * 5000 - 5000;

//       positions[i * 3] = x;
//       positions[i * 3 + 1] = y;
//       positions[i * 3 + 2] = z;

//       intensities[i] = Math.random() * 0.5 + 0.5;

//       velocities[i * 3] = speedScale * (Math.random() * 0.5 + 0.5);
//       velocities[i * 3 + 1] = speedScale * (Math.random() * 0.5 + 0.5);
//       velocities[i * 3 + 2] = speedScale * (Math.random() * 1 + 1);
//     }

//     geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
//     geometry.setAttribute('intensity', new THREE.BufferAttribute(intensities, 1));
//     geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

//     const material = new THREE.ShaderMaterial({
//       vertexShader: `
//         varying vec3 vPosition;
//         void main() {
//           vPosition = position;
//           gl_PointSize = 5.0;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `,
//       fragmentShader: `
//         varying vec3 vPosition;
//         uniform float intensity;
//         void main() {
//           float dist = length(vPosition);
//           float glow = exp(-dist * 0.005) * intensity;
//           gl_FragColor = vec4(glow, glow, glow, 1.0);
//         }
//       `,
//       uniforms: {
//         intensity: { value: 1.0 },
//       },
//       transparent: true,
//       depthWrite: false,
//       blending: THREE.AdditiveBlending,
//     });

//     const points = new THREE.Points(geometry, material);
//     starRef.current = points;
//     setStars(points);
//   }, []);

//   useFrame(() => {
//     if (!stars) return;

//     const positions = starRef.current.geometry.attributes.position.array;
//     const velocities = starRef.current.geometry.attributes.velocity.array;
//     const intensities = starRef.current.geometry.attributes.intensity.array;
//     const material = starRef.current.material;

//     for (let i = 0; i < positions.length; i += 3) {
//       positions[i + 2] += velocities[i + 2];

//       if (positions[i + 2] > 0) {
//         positions[i + 2] = Math.random() * -5000 - 1000;
//       }
//     }

//     for (let i = 0; i < intensities.length; i++) {
//         intensities[i] = Math.random() * 0.8 + 0.2;
//     }

//     starRef.current.geometry.attributes.position.needsUpdate = true;
//     starRef.current.geometry.attributes.intensity.needsUpdate = true;
//     material.uniforms.intensity.value = Math.max(...intensities) * 2;
//   });

//   if (!stars) return null;

//   return (
//     <>
//       <primitive object={stars} />
//       <EffectComposer>
//         <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.5} />
//       </EffectComposer>
//     </>
//   );
// };

//!!!

const TwinklingZoomingStarField = () => {
  const [stars, setStars] = useState(null);
  const starRef = useRef();
  const speedScale = 0.2;

  useEffect(() => {
    const starCount = 5000;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount); // Add size attribute

    for (let i = 0; i < starCount; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = Math.random() * 5000 - 5000;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      sizes[i] = Math.random() * 2 + 1; // Random sizes between 1 and 3
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1)); // Set size attribute

    const material = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        void main() {
          gl_PointSize = size * (300.0 / -position.z); // Size based on distance
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        void main() {
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // Constant white color
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    starRef.current = points;
    setStars(points);
  }, []);

  useFrame(() => {
    if (!stars) return;

    const positions = starRef.current.geometry.attributes.position.array;
    const velocities = new Float32Array(positions.length);

    for (let i = 0; i < positions.length; i += 3) {
      velocities[i + 2] = speedScale * (Math.random() * 1 + 1);
      positions[i + 2] += velocities[i + 2];

      if (positions[i + 2] > 0) {
        positions[i + 2] = Math.random() * -5000 - 1000;
      }
    }

    starRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!stars) return null;

  return (
    <>
      <primitive object={stars} />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.5}
          luminanceSmoothing={0.9}
          intensity={1.5}
        />
      </EffectComposer>
    </>
  );
};

//!!

export default TwinklingZoomingStarField;
