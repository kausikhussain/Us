'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface RosePetalsProps {
  count?: number;
}

export const RosePetals: React.FC<RosePetalsProps> = ({ count = 90 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Curved petal geometry
  const petalGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.2, 0.4, 0.4, 0.8, 0, 1.2);
    shape.bezierCurveTo(-0.4, 0.8, -0.2, 0.4, 0, 0);

    const geom = new THREE.ShapeGeometry(shape, 8);
    // Add subtle curvature along Z axis
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      pos.setZ(i, Math.sin(y * Math.PI) * 0.15);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  const petalMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color('#B83250'), // Romantic crimson & blush
      roughness: 0.45,
      metalness: 0.1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.78,
    });
  }, []);

  // Initialize random particle data
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 16,
        z: (Math.random() - 0.5) * 12,
        rotX: Math.random() * Math.PI * 2,
        rotY: Math.random() * Math.PI * 2,
        rotZ: Math.random() * Math.PI * 2,
        speedY: 0.008 + Math.random() * 0.014,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        scale: 0.35 + Math.random() * 0.4,
      });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    if (!meshRef.current) return;

    particles.forEach((p, i) => {
      p.y -= p.speedY;
      if (p.y < -8) {
        p.y = 8;
        p.x = (Math.random() - 0.5) * 16;
      }
      p.rotX += p.rotSpeedX;
      p.rotY += p.rotSpeedY;

      dummy.position.set(p.x + Math.sin(p.y * 0.5) * 0.4, p.y, p.z);
      dummy.rotation.set(p.rotX, p.rotY, p.rotZ);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, petalMaterial, count]}
      frustumCulled={false}
    />
  );
};
