import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Environment3D — Dynamic cinematic environment
 * Changes lighting, fog, and atmosphere per chapter
 */

// Chapter environments — colors, fog, lighting
export const chapterEnvironments = [
  { // 0 — The Beginning (Baby Years)
    ambientColor: '#1A080A', ambientIntensity: 0.5,
    sunColor: '#DC2626', sunIntensity: 1.0, sunPos: [10, 15, 5],
    fogColor: '#050508', fogNear: 25, fogFar: 85,
  },
  { // 1 — Little Aashik
    ambientColor: '#0D0D14', ambientIntensity: 0.6,
    sunColor: '#E2E8F0', sunIntensity: 1.2, sunPos: [8, 18, 0],
    fogColor: '#050508', fogNear: 30, fogFar: 90,
  },
  { // 2 — The Troublemaker
    ambientColor: '#1C0B0E', ambientIntensity: 0.55,
    sunColor: '#EF4444', sunIntensity: 1.1, sunPos: [-8, 16, 5],
    fogColor: '#060508', fogNear: 28, fogFar: 85,
  },
  { // 3 — School Days
    ambientColor: '#0E1118', ambientIntensity: 0.65,
    sunColor: '#93C5FD', sunIntensity: 1.3, sunPos: [12, 20, -5],
    fogColor: '#050508', fogNear: 35, fogFar: 100,
  },
  { // 4 — Brothers
    ambientColor: '#1E0B0E', ambientIntensity: 0.6,
    sunColor: '#DC2626', sunIntensity: 1.2, sunPos: [-10, 15, 5],
    fogColor: '#050508', fogNear: 30, fogFar: 90,
  },
  { // 5 — Family ❤️
    ambientColor: '#200A0D', ambientIntensity: 0.7,
    sunColor: '#E11D48', sunIntensity: 1.2, sunPos: [5, 12, 5],
    fogColor: '#060406', fogNear: 25, fogFar: 80,
  },
  { // 6 — Adventures
    ambientColor: '#0A0E18', ambientIntensity: 0.6,
    sunColor: '#60A5FA', sunIntensity: 1.3, sunPos: [15, 22, 0],
    fogColor: '#040508', fogNear: 30, fogFar: 95,
  },
  { // 7 — Car Lover
    ambientColor: '#180608', ambientIntensity: 0.5,
    sunColor: '#DC2626', sunIntensity: 1.4, sunPos: [0, 12, 10],
    fogColor: '#040406', fogNear: 22, fogFar: 70,
  },
  { // 8 — Growing Up
    ambientColor: '#0E0E14', ambientIntensity: 0.6,
    sunColor: '#CBD5E1', sunIntensity: 1.2, sunPos: [-8, 18, -5],
    fogColor: '#050508', fogNear: 30, fogFar: 88,
  },
  { // 9 — 11 Years Completed
    ambientColor: '#22080B', ambientIntensity: 0.75,
    sunColor: '#DC2626', sunIntensity: 1.8, sunPos: [0, 30, 0],
    fogColor: '#070406', fogNear: 20, fogFar: 75,
  },
  { // 10 — Welcome to Year 12
    ambientColor: '#2A060A', ambientIntensity: 0.8,
    sunColor: '#EF4444', sunIntensity: 2.0, sunPos: [0, 15, -10],
    fogColor: '#050406', fogNear: 15, fogFar: 65,
  },
];

const _col = new THREE.Color();
const _fog = new THREE.Color();

export default function Environment3D({ onChapterChange }) {
  const ambientRef = useRef();
  const sunRef = useRef();
  const scroll = useScroll();
  const chapterRef = useRef(0);

  useFrame(() => {
    const t = scroll.offset;
    const chIdx = Math.min(Math.floor(t * 12), 11);
    const nextIdx = Math.min(chIdx + 1, 11);
    const localT = (t * 12) - chIdx; // 0→1 within chapter

    const a = chapterEnvironments[chIdx];
    const b = chapterEnvironments[nextIdx];

    // Lerp ambient
    if (ambientRef.current) {
      _col.set(a.ambientColor).lerp(new THREE.Color(b.ambientColor), localT);
      ambientRef.current.color.copy(_col);
      ambientRef.current.intensity = THREE.MathUtils.lerp(a.ambientIntensity, b.ambientIntensity, localT);
    }

    // Lerp sun
    if (sunRef.current) {
      _col.set(a.sunColor).lerp(new THREE.Color(b.sunColor), localT);
      sunRef.current.color.copy(_col);
      sunRef.current.intensity = THREE.MathUtils.lerp(a.sunIntensity, b.sunIntensity, localT);
    }

    // Notify chapter change
    if (chIdx !== chapterRef.current) {
      chapterRef.current = chIdx;
      onChapterChange?.(chIdx);
    }
  });

  return (
    <>
      {/* Dynamic lights — Black + Crimson Red dominant with subtle blue contrast */}
      <ambientLight ref={ambientRef} color="#1A080A" intensity={0.5} />
      <directionalLight
        ref={sunRef}
        color="#DC2626"
        intensity={1.2}
        position={[10, 15, 5]}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={100}
        shadow-camera-near={0.5}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      />

      {/* Subtle fill light */}
      <pointLight color="#1D2A44" intensity={0.35} position={[0, 8, -50]} />

      {/* ── STATIC ENVIRONMENT OBJECTS ──────────── */}
      <TreeRows />
      <StreetLights />
      <Mountains />
      <BuildingRow side={1} startZ={-35} count={8} />
      <BuildingRow side={-1} startZ={-35} count={8} />
    </>
  );
}

// Trees along both sides of the road
function TreeRows() {
  const trees = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 40; i++) {
      const z = 45 - i * 6.5;
      const sideX = 6.5 + Math.random() * 2.5;
      const height = 2.5 + Math.random() * 2;
      const radius = 0.8 + Math.random() * 0.6;
      arr.push({ z, sideX, height, radius });
    }
    return arr;
  }, []);

  return (
    <group>
      {trees.map((t, i) => (
        <group key={i}>
          <Tree
            position={[t.sideX, 0, t.z]}
            height={t.height}
            radius={t.radius}
            seed={i}
          />
          <Tree
            position={[-t.sideX, 0, t.z]}
            height={t.height}
            radius={t.radius}
            seed={i + 100}
          />
        </group>
      ))}
    </group>
  );
}

function Tree({ position, height, radius, seed }) {
  const green = useMemo(() => {
    const h = 0.33 + (seed % 10) * 0.005;
    return new THREE.Color().setHSL(h, 0.6, 0.12 + (seed % 5) * 0.02);
  }, [seed]);

  const trunkH = height * 0.4;
  const leavesH = height * 0.75;

  return (
    <group position={position}>
      {/* Trunk */}
      <mesh castShadow position={[0, trunkH / 2, 0]}>
        <cylinderGeometry args={[0.1, 0.15, trunkH, 6]} />
        <meshStandardMaterial color="#2A1A0A" roughness={0.95} />
      </mesh>
      {/* Foliage - two cones */}
      <mesh castShadow position={[0, trunkH + leavesH * 0.45, 0]}>
        <coneGeometry args={[radius, leavesH, 7]} />
        <meshStandardMaterial color={green} roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, trunkH + leavesH * 0.75, 0]}>
        <coneGeometry args={[radius * 0.65, leavesH * 0.65, 6]} />
        <meshStandardMaterial color={green} roughness={0.9} />
      </mesh>
    </group>
  );
}

// Street lights
function StreetLights() {
  const lights = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 26; i++) {
      arr.push({ z: 44 - i * 10, side: i % 2 === 0 ? 1 : -1 });
    }
    return arr;
  }, []);

  return (
    <group>
      {lights.map((l, i) => (
        <StreetLight key={i} position={[l.side * 5.5, 0, l.z]} flip={l.side < 0} />
      ))}
    </group>
  );
}

function StreetLight({ position, flip }) {
  const dir = flip ? -1 : 1;
  return (
    <group position={position}>
      {/* Pole */}
      <mesh castShadow position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 5, 8]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Arm */}
      <mesh position={[dir * 0.5, 5.1, 0]} rotation={[0, 0, dir * 0.15]}>
        <boxGeometry args={[1.0, 0.06, 0.06]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Light fixture */}
      <mesh position={[dir * 1.0, 4.9, 0]}>
        <boxGeometry args={[0.35, 0.12, 0.25]} />
        <meshStandardMaterial
          color="#111"
          emissive="#FFD580"
          emissiveIntensity={0.8}
        />
      </mesh>
      {/* Point light */}
      <pointLight
        position={[dir * 1.0, 4.7, 0]}
        color="#FFD058"
        intensity={1.2}
        distance={12}
        decay={2}
      />
    </group>
  );
}

// Background mountains (low-poly)
function Mountains() {
  const mts = useMemo(() => [
    { x: -25, z: -60, h: 18, r: 12 },
    { x: 22,  z: -80, h: 22, r: 14 },
    { x: -30, z: -100,h: 15, r: 10 },
    { x: 28,  z: -115,h: 25, r: 16 },
    { x: -22, z: -130,h: 20, r: 13 },
    { x: 18,  z: -150,h: 18, r: 11 },
    { x: -28, z: -165,h: 22, r: 15 },
  ], []);

  return (
    <group>
      {mts.map((m, i) => (
        <mesh key={i} position={[m.x, -0.5, m.z]} castShadow>
          <coneGeometry args={[m.r, m.h, 5 + (i % 3)]} />
          <meshStandardMaterial
            color={`hsl(220, 20%, ${8 + i % 4}%)`}
            roughness={0.95}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

// Buildings (visible from school years onwards)
function BuildingRow({ side, startZ, count }) {
  const buildings = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: side * (8 + Math.random() * 4),
      z: startZ - i * 18 - Math.random() * 5,
      h: 4 + Math.random() * 8,
      w: 2.5 + Math.random() * 2,
      d: 2 + Math.random() * 1.5,
      hasLight: Math.random() > 0.5,
    }));
  }, [side, startZ, count]);

  return (
    <group>
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, 0, b.z]}>
          {/* Building body */}
          <mesh castShadow position={[0, b.h / 2, 0]}>
            <boxGeometry args={[b.w, b.h, b.d]} />
            <meshStandardMaterial
              color={`hsl(220, 15%, ${10 + i % 6}%)`}
              roughness={0.6}
              metalness={0.3}
            />
          </mesh>
          {/* Windows - emissive */}
          {b.hasLight && (
            <mesh position={[0, b.h * 0.6, b.d / 2 + 0.01]}>
              <planeGeometry args={[b.w * 0.6, b.h * 0.4]} />
              <meshStandardMaterial
                color="#111827"
                emissive="#3B5878"
                emissiveIntensity={0.4}
                transparent
                opacity={0.8}
              />
            </mesh>
          )}
          {/* Rooftop light */}
          {b.hasLight && (
            <pointLight
              position={[0, b.h + 0.5, 0]}
              color="#3B82F6"
              intensity={0.3}
              distance={5}
              decay={2}
            />
          )}
        </group>
      ))}
    </group>
  );
}
