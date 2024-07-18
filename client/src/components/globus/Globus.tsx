import { useRef, Suspense } from "react";
import * as THREE from 'three'
import { Canvas } from "react-three-fiber";
import { useFrame, useLoader } from '@react-three/fiber';
import img from './earth.jpg'
import "./index.scss"

const Box = () => {
  const mesh = useRef<THREE.Mesh | null>(null)

  useFrame(() => {
    if (mesh.current) {
      mesh.current!.rotation.y -= 0.004;
    }
  });

  // @ts-ignore
  const texture = useLoader(THREE.TextureLoader, img) as THREE.Texture;

  return (
    <mesh position={[0, 0, 2]} ref={mesh} scale={1}>
      <sphereGeometry  attach="geometry" args={[]}/>
      <meshStandardMaterial attach='material' map={texture}/>
    </mesh>
  )
}

const Lights = () => {

  return (
    <>
      <ambientLight/>
      <pointLight position={[10, -1, 5]} intensity={1000}/>
    </>
  )
}

function ThreeFigure() {

  return (
    <Canvas className="figure" style={{ display: 'flex', width: '500px', height: '600px' }}
            camera={{ position: [0, 0, 10], fov: 20 }}>
      <Suspense fallback={null}>
        <Lights/>
        <Box/>
      </Suspense>
    </Canvas>
  );
}


export default ThreeFigure