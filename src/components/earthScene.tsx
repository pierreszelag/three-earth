import React, { FunctionComponent, Suspense } from 'react';
import { Stats, ScrollControls, OrbitControls } from '@react-three/drei';
import EarthObject from './earthObject';

const EarthScene = () => {
  return (
    <>
        <color attach="background" args={['black']} />
        <directionalLight color="white" intensity={5} position={[15, 15, -15]} />
        <Suspense>
            <ScrollControls pages={4} damping={0.25}>
                <EarthObject />
            </ScrollControls>
        </Suspense>
        <Stats />
    </>
  );
}

export default EarthScene;