
import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSystem = () => {
  const points = useRef<THREE.Points>(null!);
  const { mouse, viewport } = useThree();
  
  const particleCount = 2000;
  
  const [positions, initialPositions] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const initPos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 10;
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      
      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;
    }
    return [pos, initPos];
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positionAttribute = points.current.geometry.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Gentle flow motion
      const x = initialPositions[i3];
      const y = initialPositions[i3 + 1];
      const z = initialPositions[i3 + 2];
      
      let targetX = x + Math.sin(time * 0.2 + y) * 0.5;
      let targetY = y + Math.cos(time * 0.3 + x) * 0.5;
      
      // Mouse repulsion
      const mouseX = (mouse.x * viewport.width) / 2;
      const mouseY = (mouse.y * viewport.height) / 2;
      
      const dx = targetX - mouseX;
      const dy = targetY - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const repulsionRadius = 1.5;
      const repulsionForce = 0.5;
      
      if (dist < repulsionRadius) {
        const angle = Math.atan2(dy, dx);
        const force = (repulsionRadius - dist) * repulsionForce;
        targetX += Math.cos(angle) * force;
        targetY += Math.sin(angle) * force;
      }

      positionAttribute.array[i3] += (targetX - positionAttribute.array[i3]) * 0.1;
      positionAttribute.array[i3 + 1] += (targetY - positionAttribute.array[i3 + 1]) * 0.1;
      positionAttribute.array[i3 + 2] = z + Math.sin(time * 0.5 + x) * 0.2;
    }
    
    positionAttribute.needsUpdate = true;
    points.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#d4af37"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const QiBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#0a0a0a] to-[#2b1a0a]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ParticleSystem />
      </Canvas>
    </div>
  );
};

export default QiBackground;
