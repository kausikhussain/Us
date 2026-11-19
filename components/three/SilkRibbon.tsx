'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SilkRibbonProps {
  color?: string;
}

export const SilkRibbon: React.FC<SilkRibbonProps> = ({ color = '#E8BBC7' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Generate an elegant, sweeping satin ribbon that frames the viewport
  // gracefully avoiding the center focal zone
  const { geometry, material } = useMemo(() => {
    // Sweeping theatrical ribbon framing the periphery
    const curvePoints = [
      new THREE.Vector3(-6.5, 4.5, -2.5),
      new THREE.Vector3(-4.0, 3.8, -1.8),
      new THREE.Vector3(0.0, 4.8, -3.0),
      new THREE.Vector3(4.5, 3.5, -1.5),
      new THREE.Vector3(6.5, 0.5, -2.0),
      new THREE.Vector3(4.8, -3.2, -1.8),
      new THREE.Vector3(0.0, -4.5, -2.8),
      new THREE.Vector3(-4.5, -3.5, -1.5),
      new THREE.Vector3(-6.5, -0.5, -2.2),
      new THREE.Vector3(-5.0, 2.5, -2.0),
    ];

    const curve = new THREE.CatmullRomCurve3(curvePoints, true);
    // Delicate, high-fashion ribbon tube (radius 0.22)
    const geom = new THREE.TubeGeometry(curve, 140, 0.22, 16, true);

    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.22,
      metalness: 0.35,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.72,
    });

    return { geometry: geom, material: mat };
  }, [color]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += delta * 0.04;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.12;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.18;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} position={[0, 0, -1.5]} />
  );
};
