import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

/**
 * CameraRig — Scroll-driven cinematic camera
 * Maps scroll 0→1 along a CatmullRom spline path
 */

// Camera spline: follows the road with organic curves
const cameraSpline = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,    5,   52),   // 0.00 — Hero
  new THREE.Vector3(1.5,  4,   35),   // 0.08 — Baby
  new THREE.Vector3(-1,   3.5, 15),   // 0.17 — Little Aashik
  new THREE.Vector3(2,    4,   -5),   // 0.25 — Troublemaker
  new THREE.Vector3(-1.5, 3.5, -28),  // 0.33 — School
  new THREE.Vector3(0.5,  4,   -50),  // 0.42 — Brothers
  new THREE.Vector3(-2,   4.5, -72),  // 0.50 — Family ❤️
  new THREE.Vector3(1,    3.5, -93),  // 0.58 — Adventures
  new THREE.Vector3(-1,   3,   -115), // 0.67 — Car Lover
  new THREE.Vector3(2,    4,   -135), // 0.75 — Growing Up
  new THREE.Vector3(0,    6,   -155), // 0.83 — 11 Years
  new THREE.Vector3(0,    3.5, -172), // 0.92 — Approach
  new THREE.Vector3(0,    2.8, -182), // 1.00 — Finish
]);

// Separate look-at spline (slightly ahead of camera)
const lookAtSpline = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0,    2.5, 25),
  new THREE.Vector3(1,    2,   10),
  new THREE.Vector3(-0.5, 2,   -8),
  new THREE.Vector3(1.2,  2.2, -25),
  new THREE.Vector3(-1,   2,   -45),
  new THREE.Vector3(0.3,  2.2, -65),
  new THREE.Vector3(-1.5, 2.3, -85),
  new THREE.Vector3(0.7,  2,   -108),
  new THREE.Vector3(-0.5, 2,   -128),
  new THREE.Vector3(1.5,  2.2, -148),
  new THREE.Vector3(0,    2.5, -162),
  new THREE.Vector3(0,    2,   -175),
  new THREE.Vector3(0,    2,   -188),
]);

const _pos = new THREE.Vector3();
const _look = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _up = new THREE.Vector3(0, 1, 0);

export default function CameraRig() {
  const scroll = useScroll();
  const smoothT = useRef(0);

  useFrame((state, delta) => {
    const rawT = scroll.offset;
    // Smooth/ease the scroll (feels like a real car response)
    smoothT.current = THREE.MathUtils.lerp(smoothT.current, rawT, Math.min(delta * 3, 0.15));
    const t = smoothT.current;

    // Camera position
    cameraSpline.getPoint(t, _pos);
    state.camera.position.copy(_pos);

    // Look-at target
    lookAtSpline.getPoint(Math.min(t + 0.03, 1), _look);
    state.camera.lookAt(_look);

    // Subtle camera roll for cinematic feel
    const roll = Math.sin(t * Math.PI * 5) * 0.015;
    state.camera.rotateZ(roll * 0.05);
  });

  return null;
}
