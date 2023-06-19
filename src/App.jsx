import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import './App.css'
import Ball from '@/component/Ball';
import Dragon from "@/component/Dragon"
import {Environment} from "@react-three/drei";
import * as THREE from "three";

function App() {
  return (
    <Canvas id="three-canvas-container" shadows>
      <Suspense fallback={<></>}>
          <Ball />
          <Dragon/>
          <Environment background>
              <mesh>
                  <sphereGeometry args={[50, 100, 100]} />
                  <meshBasicMaterial color="#c63939" side={THREE.BackSide} />
              </mesh>
          </Environment>
      </Suspense>
    </Canvas>
  )
}

export default App
