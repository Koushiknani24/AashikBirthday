import { useRef, useMemo, Suspense, Component } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Roadside Billboard Frame Materials (Dark Obsidian + Crimson Red M-Glow)
 */
const frameMaterial = new THREE.MeshStandardMaterial({
  color: '#08080C',
  metalness: 0.9,
  roughness: 0.15,
});

const frameBorderMaterial = new THREE.MeshStandardMaterial({
  color: '#DC2626',
  emissive: '#991B1B',
  emissiveIntensity: 0.8,
  metalness: 0.8,
  roughness: 0.2,
});

const poleMaterial = new THREE.MeshStandardMaterial({
  color: '#15151C',
  metalness: 0.8,
  roughness: 0.3,
});

function BillboardMesh({ src, position, rotation = [0, 0, 0], scrollIn, scrollOut, scale = 1, caption = '' }) {
  const groupRef = useRef();
  const scroll = useScroll();

  // Load photo texture
  const texture = useLoader(THREE.TextureLoader, src);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;

  // Aspect ratio preserving dimensions
  const aspect = texture.image && texture.image.width && texture.image.height
    ? texture.image.width / texture.image.height
    : 1;

  // Constrain billboard width & height naturally
  const w = Math.min(Math.max(1.8 * aspect, 1.6), 3.2) * scale;
  const h = (w / aspect);

  useFrame(() => {
    if (!groupRef.current) return;
    const t = scroll.offset;

    // Visibility range with generous fade window
    const range = Math.max(scrollOut - scrollIn, 0.08);
    const fadeIn = THREE.MathUtils.smoothstep(t, scrollIn - 0.04, scrollIn + range * 0.15);
    const fadeOut = 1 - THREE.MathUtils.smoothstep(t, scrollOut - range * 0.15, scrollOut + 0.04);
    const visible = Math.min(fadeIn, fadeOut);

    groupRef.current.visible = visible > 0.02;

    // Gentle micro-elevation float
    groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0012 + position[0]) * 0.04;
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Sleek Support Post to the curb/ground */}
      <mesh position={[0, -h / 2 - 1.1, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 2.2, 12]} />
        <primitive object={poleMaterial} />
      </mesh>

      {/* Outer Obsidian Frame Box */}
      <mesh castShadow position={[0, 0, -0.02]}>
        <boxGeometry args={[w + 0.16, h + 0.16, 0.06]} />
        <primitive object={frameMaterial} />
      </mesh>

      {/* Crimson Red LED Border Bezel */}
      <mesh position={[0, 0, -0.01]}>
        <boxGeometry args={[w + 0.06, h + 0.06, 0.07]} />
        <primitive object={frameBorderMaterial} />
      </mesh>

      {/* Crystal Clear Photo Plane with Emissive Face Lighting */}
      <mesh position={[0, 0, 0.03]}>
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.15}
          metalness={0.0}
          emissive="#FFFFFF"
          emissiveMap={texture}
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Subtle Crimson Red Backlight Aura */}
      <pointLight
        position={[0, 0, 0.4]}
        color="#DC2626"
        intensity={0.6}
        distance={3.5}
        decay={2}
      />
    </group>
  );
}

// Error boundary wrapper so any missing image doesn't crash Three.js
function SafePhotoPlane(props) {
  if (!props.src) return null;
  return (
    <Suspense fallback={null}>
      <ErrorBoundaryWrapper>
        <BillboardMesh {...props} />
      </ErrorBoundaryWrapper>
    </Suspense>
  );
}

class ErrorBoundaryWrapper extends Component {
  constructor(props) { super(props); this.state = { error: false }; }
  static getDerivedStateFromError() { return { error: true }; }
  render() { return this.state.error ? null : this.props.children; }
}

export default SafePhotoPlane;

/**
 * PhotoPlaneRow — Places curated photos safely ALONG THE ROADSIDE
 * as premium roadside exhibition billboards (NO LANE OBSTRUCTION!)
 */
export function PhotoPlaneRow({ photos }) {
  if (!photos || photos.length === 0) return null;

  // Chapter Z anchors along the 260-unit highway
  const chapterZs = [
    42,   // 0 Baby Years
    24,   // 1 Childhood
    6,    // 2 Troublemaker
    -14,  // 3 School
    -34,  // 4 Brothers
    -54,  // 5 Parents
    -74,  // 6 Family
    -94,  // 7 Travel
    -114, // 8 Cars
    -134, // 9 Recent / Age 11
    -154, // 10 Milestone 11
    -170, // 11 Welcome Year 12
  ];

  const chapterMap = {
    'Baby Years': 0,
    'Childhood': 1,
    'Troublemaker': 2,
    'School': 3,
    'Brothers': 4,
    'Parents': 5,
    'Family': 6,
    'Travel': 7,
    'Cars': 8,
    'Recent': 9,
    'Eleven': 10,
  };

  // Group photos so we only pick best uncrowded photos along the roadside
  const positioned = photos.map((photo, i) => {
    const ch = chapterMap[photo.stage] ?? Math.min(Math.floor(i / 3), 11);

    // Generous scroll visibility
    const scrollIn  = Math.max((ch - 0.5) / 12, 0);
    const scrollOut = Math.min((ch + 1.8) / 12, 1);

    // Alternate strictly between LEFT side (-5.2) and RIGHT side (+5.2)
    // NEVER in the driving lane (road width is ±3.2)
    const side = (i % 2 === 0) ? 1 : -1;
    const xPos = side * 5.1;
    const yPos = 2.4 + (i % 3) * 0.2;

    const baseZ = chapterZs[ch] ?? -100;
    const zOffset = -(i % 3) * 5.5;

    // Face towards the road and the approaching driver
    const yRot = side === 1 ? -0.42 : 0.42;

    return {
      ...photo,
      worldPos: [xPos, yPos, baseZ + zOffset],
      worldRot: [0, yRot, 0],
      scrollIn,
      scrollOut,
      scale: photo.priority === 'high' ? 1.05 : 0.9,
    };
  });

  return (
    <group>
      {positioned.map((p, i) => (
        <SafePhotoPlane
          key={p.src || i}
          src={p.src}
          position={p.worldPos}
          rotation={p.worldRot}
          scrollIn={p.scrollIn}
          scrollOut={p.scrollOut}
          scale={p.scale}
          caption={p.caption}
        />
      ))}
    </group>
  );
}
