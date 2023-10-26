import React, { useState, useLayoutEffect, useRef, FunctionComponent, Suspense } from 'react';
import './earthScene.css';
import { useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial, useGLTF, useScroll } from '@react-three/drei';
import gsap from "gsap";
import { onSphere } from "maath/random";
import { EarthModel } from './earthModel'


const EarthObject= () => {
    const ref = useRef<any>();
    const tl = useRef<any>();

    const scroll = useScroll();

    const [sphere] = useState(() => new Float32Array(onSphere(new Float32Array(5000), { radius: 100 })))

    useFrame(() => {
        tl.current.seek(scroll.offset * tl.current.duration());
    });

    useLayoutEffect(() => {
        tl.current = gsap.timeline();
    
        // VERTICAL ANIMATION
        tl.current.to(
          ref.current.position,
          {
            duration: 2,
            x: -10,
            y: -10,
          },
          0
        );

        //EARTH ROTATION
        tl.current.to(
            ref.current.rotation,
            { duration: 2, x: Math.PI / 3, y: -Math.PI / 3, z: Math.PI / 3 },
            0
        );
        // tl.current.to(
        //     ref.current.rotation,
        //     { duration: 1, x: 0, y: -Math.PI / 6, z: 0 },
        //     1
        // );
    });
    
  return (
    <group ref={ref} rotation={[0.1, 0.5, 0]}>
        <EarthModel />
        <Sphere>
            <sphereGeometry args={[10.05, 64, 64]} />
            <meshStandardMaterial transparent={true} opacity={0.4} color="#519bbd" />
        </Sphere>
        <Points positions={sphere} stride={3} frustumCulled={false}>
            <PointMaterial transparent color="#ffa0e0" size={0.3} sizeAttenuation={true} depthWrite={false} />
        </Points>
    </group>
  );
}

export default EarthObject;