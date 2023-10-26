import React, { useState, useLayoutEffect, useRef, FunctionComponent, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Points, PointMaterial, useGLTF, useScroll } from '@react-three/drei';
import gsap from "gsap";
import { onSphere } from "maath/random";
import { EarthModel } from './earthModel'


const EarthObject= () => {
    const ref = useRef<any>();
    const earthRef = useRef<any>();
    const tl = useRef<any>();

    const scroll = useScroll();

    const [sphere1] = useState(() => new Float32Array(onSphere(new Float32Array(100), { radius: 1000 })));
    const [sphere2] = useState(() => new Float32Array(onSphere(new Float32Array(2000), { radius: 1000 })));
    const [sphere3] = useState(() => new Float32Array(onSphere(new Float32Array(3000), { radius: 1000 })));

    useFrame(() => {
        tl.current.seek(scroll.offset * tl.current.duration());
        if (earthRef.current) {
          earthRef.current.rotation.y += 0.001;
        }
    });

    useLayoutEffect(() => {
        tl.current = gsap.timeline();
    
        tl.current.to(
          ref.current.position,
          {
            duration: 2,
            x: -10,
            y: -10,
          },
          0
        );

        tl.current.to(
          ref.current.position,
          {
            duration: 1,
            x: 0,
            y: 0,
            z: -5
          },
          2
        );

        // tl.current.to(
        //     ref.current.rotation,
        //     { duration: 3, x: 0, y: -Math.PI / 6, z: 0 },
        //     0
        // );

    });
    
  return (
    <group ref={ref} rotation={[-0.5, -Math.PI / 6, 0]}>
        <group ref={earthRef}>
          <EarthModel />
        </group>
        <Sphere>
            <sphereGeometry args={[10.012, 64, 64]} />
            <meshStandardMaterial transparent={true} opacity={0.4} color="#519bbd" />
        </Sphere>
        <Points positions={sphere1} stride={3} frustumCulled={false}>
            <PointMaterial transparent color="#ffa0e0" size={6} sizeAttenuation={true} depthWrite={false} />
        </Points>
        <Points positions={sphere2} stride={3} frustumCulled={false}>
            <PointMaterial transparent color="#ffa0e0" size={3} sizeAttenuation={true} depthWrite={false} />
        </Points>
        <Points positions={sphere3} stride={3} frustumCulled={false}>
            <PointMaterial transparent color="#ffa0e0" size={1} sizeAttenuation={true} depthWrite={false} />
        </Points>
    </group>
  );
}

export default EarthObject;