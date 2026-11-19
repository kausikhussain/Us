'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface InfinityRibbonProps {
  progress?: number;
}

export const InfinityRibbon: React.FC<InfinityRibbonProps> = () => {
  const groupRef = useRef<THREE.Group>(null);

  const { ribbon1Geom, ribbon2Geom, mat1, mat2 } = useMemo(() => {
    // Generate 3D Lemniscate of Bernoulli points
    const points1: THREE.Vector3[] = [];
    const points2: THREE.Vector3[] = [];
    const scale = 5.2;

    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 2;
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const x = (scale * Math.cos(t)) / denom;
      const y = (scale * Math.sin(t) * Math.cos(t)) / denom;
      const z = Math.sin(t * 2) * 1.2;

      points1.push(new THREE.Vector3(x, y, z));
      // Second ribbon offset slightly for dual-life intertwined look
      points2.push(new THREE.Vector3(x * 1.04, y * 1.04, -z * 0.9));
    }

    const curve1 = new THREE.CatmullRomCurve3(points1, true);
    const curve2 = new THREE.CatmullRomCurve3(points2, true);

    const geom1 = new THREE.TubeGeometry(curve1, 120, 0.35, 12, true);
    const geom2 = new THREE.TubeGeometry(curve2, 120, 0.28, 12, true);

    const material1 = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E8BBC7'), // Blush silk
      roughness: 0.3,
      metalness: 0.2,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });

    const material2 = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#C99A83'), // Rose-gold silk
      roughness: 0.2,
      metalness: 0.45,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });

    return { ribbon1Geom: geom1, ribbon2Geom: geom2, mat1: material1, mat2: material2 };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -2.2]} scale={0.9}>
      <mesh geometry={ribbon1Geom} material={mat1} />
      <mesh geometry={ribbon2Geom} material={mat2} />
    </group>
  );
};
