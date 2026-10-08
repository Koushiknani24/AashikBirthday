import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Car3D — Premium BMW-inspired stylized car
 * Moves along the road in sync with scroll
 */

// Car path follows slightly behind camera
const carSpline = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,    0, 48),
  new THREE.Vector3(1.2,  0, 32),
  new THREE.Vector3(-0.8, 0, 12),
  new THREE.Vector3(1.5,  0, -8),
  new THREE.Vector3(-1.2, 0, -31),
  new THREE.Vector3(0.4,  0, -52),
  new THREE.Vector3(-1.8, 0, -74),
  new THREE.Vector3(0.8,  0, -95),
  new THREE.Vector3(-0.8, 0, -117),
  new THREE.Vector3(1.5,  0, -137),
  new THREE.Vector3(0,    0, -157),
  new THREE.Vector3(0,    0, -174),
  new THREE.Vector3(0,    0, -183),
]);

const _carPos = new THREE.Vector3();
const _carPosAhead = new THREE.Vector3();
const _carDir = new THREE.Vector3();
const _carQuat = new THREE.Quaternion();
const _up = new THREE.Vector3(0, 1, 0);

// Materials — Obsidian Black + Crimson Red M-Performance Styling
const bodyMat = new THREE.MeshStandardMaterial({
  color: '#08080C',
  metalness: 0.95,
  roughness: 0.12,
  envMapIntensity: 1.8,
});

const glassMat = new THREE.MeshStandardMaterial({
  color: '#08080A',
  metalness: 0.2,
  roughness: 0.05,
  transparent: true,
  opacity: 0.75,
});

const tireMat = new THREE.MeshStandardMaterial({
  color: '#060608',
  roughness: 0.95,
  metalness: 0.0,
});

const rimMat = new THREE.MeshStandardMaterial({
  color: '#1E1E24',
  metalness: 0.95,
  roughness: 0.15,
});

const rimCenterMat = new THREE.MeshStandardMaterial({
  color: '#DC2626',
  metalness: 0.9,
  roughness: 0.1,
  emissive: '#991B1B',
  emissiveIntensity: 0.6,
});

const headlightMat = new THREE.MeshStandardMaterial({
  color: '#FFFFFF',
  emissive: '#E0F2FE',
  emissiveIntensity: 3.5,
});

const taillightMat = new THREE.MeshStandardMaterial({
  color: '#FF1111',
  emissive: '#DC2626',
  emissiveIntensity: 3,
});

const accentMat = new THREE.MeshStandardMaterial({
  color: '#DC2626',
  emissive: '#991B1B',
  emissiveIntensity: 0.6,
  metalness: 0.85,
  roughness: 0.2,
});

// Wheel component with 6-spoke rim (BMW-inspired)
function Wheel({ position, flip = false }) {
  const wheelRef = useRef();

  useFrame((_, delta) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.x -= delta * 8;
    }
  });

  return (
    <group position={position} rotation={[0, 0, Math.PI / 2]}>
      <group ref={wheelRef}>
        {/* Tire */}
        <mesh castShadow>
          <cylinderGeometry args={[0.42, 0.42, 0.28, 32]} />
          <primitive object={tireMat} />
        </mesh>

        {/* Wheel disc */}
        <mesh>
          <cylinderGeometry args={[0.32, 0.32, 0.30, 6]} />
          <primitive object={rimMat} />
        </mesh>

        {/* 6 spokes */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 0.18,
                0,
                Math.sin(angle) * 0.18,
              ]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[0.04, 0.31, 0.22]} />
              <primitive object={rimMat} />
            </mesh>
          );
        })}

        {/* Center cap */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 0.32, 16]} />
          <primitive object={rimCenterMat} />
        </mesh>
      </group>

      {/* Brake caliper hint */}
      <mesh position={[0, 0, flip ? -0.16 : 0.16]}>
        <boxGeometry args={[0.08, 0.31, 0.06]} />
        <meshStandardMaterial color="#CC2200" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function Car3D() {
  const groupRef = useRef();
  const scroll = useScroll();
  const smoothT = useRef(0);

  useFrame((_, delta) => {
    const rawT = scroll.offset;
    smoothT.current = THREE.MathUtils.lerp(smoothT.current, rawT, Math.min(delta * 2.5, 0.12));
    const t = smoothT.current;

    if (!groupRef.current) return;

    // Position
    carSpline.getPoint(t, _carPos);
    groupRef.current.position.copy(_carPos);
    groupRef.current.position.y = 0.42; // slight lift from ground

    // Steering — face direction of travel
    const ahead = Math.min(t + 0.015, 1);
    carSpline.getPoint(ahead, _carPosAhead);
    _carDir.subVectors(_carPosAhead, _carPos).normalize();
    const angle = Math.atan2(_carDir.x, _carDir.z);
    groupRef.current.rotation.y = angle;

    // Very subtle body rock on curves
    groupRef.current.rotation.z = -_carDir.x * 0.04;
  });

  return (
    <group ref={groupRef} castShadow>
      {/* ── BODY ──────────────────────────────────── */}
      {/* Lower body / sill */}
      <mesh castShadow position={[0, 0.38, 0]}>
        <boxGeometry args={[1.96, 0.52, 4.2]} />
        <primitive object={bodyMat} />
      </mesh>

      {/* Upper body (doors) */}
      <mesh castShadow position={[0, 0.78, -0.1]}>
        <boxGeometry args={[1.88, 0.5, 3.2]} />
        <primitive object={bodyMat} />
      </mesh>

      {/* Hood (tapered front) */}
      <mesh castShadow position={[0, 0.58, 1.6]}>
        <boxGeometry args={[1.75, 0.28, 0.75]} />
        <primitive object={bodyMat} />
      </mesh>

      {/* Cabin roof */}
      <mesh castShadow position={[0, 1.22, -0.25]}>
        <boxGeometry args={[1.72, 0.4, 2.1]} />
        <primitive object={bodyMat} />
      </mesh>

      {/* Rear trunk */}
      <mesh castShadow position={[0, 0.62, -1.75]}>
        <boxGeometry args={[1.7, 0.32, 0.5]} />
        <primitive object={bodyMat} />
      </mesh>

      {/* Spoiler */}
      <mesh position={[0, 1.05, -2.05]}>
        <boxGeometry args={[1.55, 0.07, 0.25]} />
        <primitive object={accentMat} />
      </mesh>

      {/* Front bumper */}
      <mesh castShadow position={[0, 0.3, 2.15]}>
        <boxGeometry args={[1.88, 0.35, 0.18]} />
        <primitive object={bodyMat} />
      </mesh>

      {/* Rear bumper */}
      <mesh castShadow position={[0, 0.3, -2.15]}>
        <boxGeometry args={[1.88, 0.35, 0.18]} />
        <primitive object={bodyMat} />
      </mesh>

      {/* BMW Kidney Grille */}
      <mesh position={[0.3, 0.42, 2.22]}>
        <boxGeometry args={[0.35, 0.22, 0.04]} />
        <meshStandardMaterial color="#0A1220" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh position={[-0.3, 0.42, 2.22]}>
        <boxGeometry args={[0.35, 0.22, 0.04]} />
        <meshStandardMaterial color="#0A1220" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Grille frame */}
      <mesh position={[0, 0.42, 2.225]}>
        <boxGeometry args={[0.85, 0.28, 0.03]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.9} roughness={0.1} emissive="#1D4ED8" emissiveIntensity={0.3} />
      </mesh>

      {/* ── WINDOWS ──────────────────────────────── */}
      {/* Windshield */}
      <mesh position={[0, 1.12, 0.85]} rotation={[-0.25, 0, 0]}>
        <planeGeometry args={[1.6, 0.7]} />
        <primitive object={glassMat} />
      </mesh>

      {/* Rear window */}
      <mesh position={[0, 1.12, -1.32]} rotation={[0.28, 0, 0]}>
        <planeGeometry args={[1.55, 0.65]} />
        <primitive object={glassMat} />
      </mesh>

      {/* Side windows left */}
      <mesh position={[-0.945, 1.1, -0.3]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[1.85, 0.6]} />
        <primitive object={glassMat} />
      </mesh>

      {/* Side windows right */}
      <mesh position={[0.945, 1.1, -0.3]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[1.85, 0.6]} />
        <primitive object={glassMat} />
      </mesh>

      {/* ── LIGHTS ───────────────────────────────── */}
      {/* Headlights */}
      <mesh position={[0.65, 0.54, 2.23]}>
        <boxGeometry args={[0.38, 0.16, 0.04]} />
        <primitive object={headlightMat} />
      </mesh>
      <mesh position={[-0.65, 0.54, 2.23]}>
        <boxGeometry args={[0.38, 0.16, 0.04]} />
        <primitive object={headlightMat} />
      </mesh>

      {/* DRL strips */}
      <mesh position={[0.65, 0.44, 2.23]}>
        <boxGeometry args={[0.38, 0.04, 0.04]} />
        <meshStandardMaterial emissive="#3B82F6" emissiveIntensity={3} />
      </mesh>
      <mesh position={[-0.65, 0.44, 2.23]}>
        <boxGeometry args={[0.38, 0.04, 0.04]} />
        <meshStandardMaterial emissive="#3B82F6" emissiveIntensity={3} />
      </mesh>

      {/* Taillights */}
      <mesh position={[0.65, 0.54, -2.23]}>
        <boxGeometry args={[0.38, 0.18, 0.04]} />
        <primitive object={taillightMat} />
      </mesh>
      <mesh position={[-0.65, 0.54, -2.23]}>
        <boxGeometry args={[0.38, 0.18, 0.04]} />
        <primitive object={taillightMat} />
      </mesh>

      {/* Side mirrors */}
      <mesh position={[1.01, 0.98, 0.75]}>
        <boxGeometry args={[0.06, 0.1, 0.22]} />
        <primitive object={bodyMat} />
      </mesh>
      <mesh position={[-1.01, 0.98, 0.75]}>
        <boxGeometry args={[0.06, 0.1, 0.22]} />
        <primitive object={bodyMat} />
      </mesh>

      {/* Blue accent trim */}
      <mesh position={[0, 0.14, 0]}>
        <boxGeometry args={[1.96, 0.06, 4.2]} />
        <primitive object={accentMat} />
      </mesh>

      {/* ── WHEELS ───────────────────────────────── */}
      <Wheel position={[ 1.05, 0, 1.25]}  />
      <Wheel position={[-1.05, 0, 1.25]} flip />
      <Wheel position={[ 1.05, 0, -1.25]} />
      <Wheel position={[-1.05, 0, -1.25]} flip />

      {/* ── HEADLIGHT GLOW LIGHTS ─────────────────── */}
      <pointLight position={[0.65, 0.54, 3.0]} color="#E0F2FE" intensity={1.8} distance={7} decay={2} />
      <pointLight position={[-0.65, 0.54, 3.0]} color="#E0F2FE" intensity={1.8} distance={7} decay={2} />

      {/* Tail glow */}
      <pointLight position={[0, 0.5, -2.8]} color="#DC2626" intensity={1.2} distance={4} decay={2} />

      {/* Under-car crimson ambient glow */}
      <pointLight position={[0, -0.2, 0]} color="#DC2626" intensity={0.7} distance={2.5} decay={2} />
    </group>
  );
}
