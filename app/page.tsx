"use client"

import { CameraControls } from "@react-three/drei";
    import { Canvas} from '@react-three/fiber'
    import {Center, Text3D, OrbitControls } from '@react-three/drei'

export default function Home() {
  return (
    <div id="scene-container">
    <Canvas orthographic camera={{ position: [0, 0, 100], zoom: 100 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} />
      <Scene />
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} />
      <CameraControls />
    </Canvas>
    </div>
  );
}

function Scene() {
  return (
    <>
      <Center rotation={[0, 1, 0]}>
        <Text3D
          curveSegments={32}
          bevelEnabled
          bevelSize={0.04}
          bevelThickness={0.1}
          height={0.5}
          lineHeight={0.5}
          letterSpacing={-0.06}
          size={1.5}
          font="/Inter_Bold.json">
          {`Behrad\nKhodayar`}
          <meshNormalMaterial />
        </Text3D>
      </Center>
    </>
  )
}
