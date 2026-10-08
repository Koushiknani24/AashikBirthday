import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/**
 * Road — Premium cinematic road with markings, kerbs, and environment strips
 */

const ROAD_LENGTH = 260;
const ROAD_START = 55;
const ROAD_Z_CENTER = ROAD_START - ROAD_LENGTH / 2; // center point

// Materials (created once) — Dark Obsidian Highway
const asphaltMat = new THREE.MeshStandardMaterial({
  color: '#07070A',
  roughness: 0.9,
  metalness: 0.05,
});

const roadLineMat = new THREE.MeshStandardMaterial({
  color: '#FFFFFF',
  roughness: 0.5,
  emissive: '#FFFFFF',
  emissiveIntensity: 0.2,
});

const kerbMat = new THREE.MeshStandardMaterial({
  color: '#14141A',
  roughness: 0.9,
  metalness: 0.1,
});

const sidewalkMat = new THREE.MeshStandardMaterial({
  color: '#0C0C10',
  roughness: 0.95,
});

const groundMat = new THREE.MeshStandardMaterial({
  color: '#040406',
  roughness: 1,
});

export default function Road() {
  const dashCount = 60; // number of dashed center-line marks
  const edgeCount = 10; // solid edge line segments

  const dashPositions = useMemo(() => {
    return Array.from({ length: dashCount }, (_, i) => {
      const z = ROAD_START - (i / dashCount) * ROAD_LENGTH;
      return z;
    });
  }, [dashCount]);

  return (
    <group>
      {/* ── GROUND PLANE ─────────────────────────── */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, ROAD_Z_CENTER]}>
        <planeGeometry args={[60, ROAD_LENGTH + 20]} />
        <primitive object={groundMat} />
      </mesh>

      {/* ── ROAD SURFACE ─────────────────────────── */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, ROAD_Z_CENTER]}>
        <planeGeometry args={[6.4, ROAD_LENGTH]} />
        <primitive object={asphaltMat} />
      </mesh>

      {/* ── CENTER LINE DASHES ───────────────────── */}
      {dashPositions.map((z, i) => (
        <mesh key={i} position={[0, 0.01, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 1.8]} />
          <primitive object={roadLineMat} />
        </mesh>
      ))}

      {/* ── EDGE SOLID LINES (left & right) ─────── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.85, 0.01, ROAD_Z_CENTER]}>
        <planeGeometry args={[0.06, ROAD_LENGTH]} />
        <primitive object={roadLineMat} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.85, 0.01, ROAD_Z_CENTER]}>
        <planeGeometry args={[0.06, ROAD_LENGTH]} />
        <primitive object={roadLineMat} />
      </mesh>

      {/* ── KERBS / CURBS ─────────────────────────── */}
      <mesh receiveShadow position={[3.35, 0.04, ROAD_Z_CENTER]}>
        <boxGeometry args={[0.4, 0.08, ROAD_LENGTH]} />
        <primitive object={kerbMat} />
      </mesh>
      <mesh receiveShadow position={[-3.35, 0.04, ROAD_Z_CENTER]}>
        <boxGeometry args={[0.4, 0.08, ROAD_LENGTH]} />
        <primitive object={kerbMat} />
      </mesh>

      {/* ── SIDEWALKS ────────────────────────────── */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[4.5, 0.06, ROAD_Z_CENTER]}>
        <planeGeometry args={[1.9, ROAD_LENGTH]} />
        <primitive object={sidewalkMat} />
      </mesh>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[-4.5, 0.06, ROAD_Z_CENTER]}>
        <planeGeometry args={[1.9, ROAD_LENGTH]} />
        <primitive object={sidewalkMat} />
      </mesh>

      {/* ── FINISH LINE ──────────────────────────── */}
      <FinishLine />
    </group>
  );
}

function FinishLine() {
  const z = -180;
  const tiles = 8;

  return (
    <group position={[0, 0.015, z]}>
      {Array.from({ length: tiles }).map((_, col) => (
        <group key={col}>
          {/* Row of alternating black/white squares */}
          {[0, 1].map((row) => (
            <mesh
              key={row}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[
                -2.8 + (col + 0.5) * (5.6 / tiles),
                0,
                row % 2 === 0 ? 0.3 : -0.3,
              ]}
            >
              <planeGeometry args={[5.6 / tiles * 0.98, 0.55]} />
              <meshStandardMaterial
                color={((col + row) % 2 === 0) ? '#FFFFFF' : '#111111'}
                emissive={((col + row) % 2 === 0) ? '#FFFFFF' : '#000000'}
                emissiveIntensity={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* Finish line cinematic red glow */}
      <pointLight color="#DC2626" intensity={3.5} distance={10} decay={2} position={[0, 1, 0]} />
    </group>
  );
}
