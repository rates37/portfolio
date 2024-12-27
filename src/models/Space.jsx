import React from 'react'

import spaceScene from '../assets/3d/space.glb'
import { useGLTF } from '@react-three/drei'

const Space = () => {

    const space = useGLTF(spaceScene);
  return (
    <mesh>
        <primitive object={space.scene}/>
    </mesh>
  )
}

export default Space