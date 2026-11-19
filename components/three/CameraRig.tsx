'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const CameraRig: React.FC = () => {
  useFrame((state) => {
    // Subtle mouse parallax
    const targetX = state.pointer.x * 0.8;
    const targetY = state.pointer.y * 0.5;

    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.04);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
};
