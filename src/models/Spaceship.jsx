/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Silversem (https://sketchfab.com/Silversem)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/spaceship-2b07b45c32df44fa8a9591c28d5f3487
Title: Spaceship
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

// import spaceship from '../assets/3d/spaceship.glb'
import spaceship from '../assets/3d/low-poly_spaceship.glb'

const Spaceship = (props) => {
    const { nodes, materials } = useGLTF(spaceship)
    return (
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_Material_0.geometry}
          material={materials.Material}
          rotation={[-Math.PI / 2, 0, Math.PI/2]}
          scale={1}
        />
      </group>
    )
  }

export default Spaceship;