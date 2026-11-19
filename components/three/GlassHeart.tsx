'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GlassHeartProps {
  position?: [number, number, number];
  scale?: number;
}

export const GlassHeart: React.FC<GlassHeartProps> = ({
  position = [0, 2.2, -1.8],
  scale = 0.85,
}) => {
  const meshRef = useRef<THREE.Mesh>(null);

  // Sculptural, geometric heart geometry with luxury beveled facets
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 1.0);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    geom.rotateZ(Math.PI);
    return geom;
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FFF5F7'),
      transmission: 0.92,
      opacity: 0.85,
      transparent: true,
      roughness: 0.1,
      ior: 1.52,
      thickness: 0.6,
      specularIntensity: 1.0,
      specularColor: new THREE.Color('#C99A83'),
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.8,
    });
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={position}
      scale={scale}
    />
  );
};
