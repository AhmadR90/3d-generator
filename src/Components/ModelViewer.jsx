

import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { ErrorBoundary } from "react-error-boundary";
import { Html } from "@react-three/drei";

// Spinning model component
function SpinningModel({ url }) {
  const group = useRef();
  const { scene } = useGLTF(url);
  const [clicked, setClicked] = useState(false);

  useFrame((_, delta) => {
    if (!clicked && group.current) {
      group.current.rotation.y -= delta * 0.5;
    }
  });

  return (
    <group ref={group} onClick={() => setClicked(!clicked)}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}
const LoadingSpinner = () => (
    <div className="flex items-center justify-center">
      <div className="animate-spin">
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
    </div>
  );
// Fallback shown while the model is loading
function LoaderFallback() {
  return (
    <Html center>
      <div
        style={{
          color: "blue",
          background: "black",
          padding: "10px",
          borderRadius: "8px",
          
        }}
      > <LoadingSpinner/> </div>
    </Html>
  );
}

// Fallback shown if something goes wrong
function ErrorFallback({ error }) {
  return (
    <div style={{ color: "red" }}>Failed to load 3D model: {error.message}</div>
  );
}

// Main component
export default function ModelViewer2({ modelUrl }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Canvas
        camera={{ position: [0, 1, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={<LoaderFallback />}>
          <SpinningModel url={modelUrl} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </ErrorBoundary>
  );
}
