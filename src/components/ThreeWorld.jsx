import { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ScrollControls, useScroll } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Eye, BookOpen, Compass, ChevronDown, Sparkles } from 'lucide-react';

import Environment3D, { chapterEnvironments } from '../three/Environment3D.jsx';
import Road from '../three/Road.jsx';
import Car3D from '../three/Car.jsx';
import CameraRig from '../three/CameraRig.jsx';
import { PhotoPlaneRow } from '../three/PhotoPlane.jsx';
import { photoManifest, storyChapters } from '../data/photoManifest.js';

// Internal HUD tracker that reads scroll progress from R3F
function ScrollProgressTracker({ onProgressChange }) {
  const scroll = useScroll();
  const lastP = useRef(-1);

  useFrame(() => {
    const p = Math.max(0, Math.min(1, scroll.offset));
    if (Math.abs(p - lastP.current) > 0.005) {
      lastP.current = p;
      onProgressChange(p);
    }
  });

  return null;
}

export default function ThreeWorld({ onExitToStory }) {
  const [progress, setProgress] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const lastProgressRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const audioContextRef = useRef(null);
  const engineGainRef = useRef(null);

  // Update speed & active chapter based on scroll progress
  const handleProgressChange = (p) => {
    setProgress(p);

    // Calculate simulated speed based on rate of change
    const now = Date.now();
    const dt = (now - lastTimeRef.current) / 1000;
    if (dt > 0.05) {
      const dp = Math.abs(p - lastProgressRef.current);
      const calculatedSpeed = Math.min(140, Math.round((dp / dt) * 450));
      setSpeed((prev) => Math.round(prev * 0.7 + calculatedSpeed * 0.3));
      lastProgressRef.current = p;
      lastTimeRef.current = now;
    }

    // Determine current chapter
    const chIndex = Math.min(Math.floor(p * storyChapters.length), storyChapters.length - 1);
    setActiveChapterIndex(chIndex);
  };

  // Gentle engine ambient synthesizer with Web Audio API
  useEffect(() => {
    if (!soundEnabled) {
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
        audioContextRef.current = null;
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(55, ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      engineGainRef.current = gain;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      return () => {
        try { ctx.close(); } catch {}
      };
    } catch (e) {
      console.warn('Audio not allowed', e);
    }
  }, [soundEnabled]);

  const currentChapter = storyChapters[activeChapterIndex] || storyChapters[0];
  const isFinished = progress >= 0.95;

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#05070D', overflow: 'hidden' }}>
      {/* ── 3D CANVAS ───────────────────────────────────────── */}
      <Canvas
        camera={{ position: [0, 5, 52], fov: 50, near: 0.1, far: 300 }}
        dpr={[1, 1.75]}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          alpha: false,
        }}
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        <color attach="background" args={['#05070D']} />
        <fog attach="fog" args={['#05070D', 25, 90]} />

        <ScrollControls pages={11} damping={0.25} distance={1.2}>
          <ScrollProgressTracker onProgressChange={handleProgressChange} />
          <Suspense fallback={null}>
            <Environment3D />
            <Road />
            <Car3D />
            <PhotoPlaneRow photos={photoManifest} />
            <CameraRig />
          </Suspense>
        </ScrollControls>
      </Canvas>

      {/* ── TOP HUD ─────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 40,
        }}
      >
        {/* Brand / Name badge */}
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(10, 14, 26, 0.75)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '0.6rem 1.2rem',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>🏎️</span>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.12em', color: '#FFFFFF', textTransform: 'uppercase' }}>
              VULLI AASHIK
            </div>
            <div style={{ fontSize: '0.62rem', color: '#60A5FA', letterSpacing: '0.08em', fontWeight: 600 }}>
              11 YEARS COMPLETED • 3D DRIVE
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '0.6rem', pointerEvents: 'auto' }}>
          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            style={{
              background: 'rgba(10, 14, 26, 0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: soundEnabled ? '#60A5FA' : 'rgba(255, 255, 255, 0.6)',
              padding: '0.6rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title={soundEnabled ? 'Mute engine audio' : 'Enable engine audio'}
            aria-label="Sound toggle"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {/* Switch to Full Story button */}
          <button
            onClick={onExitToStory}
            style={{
              background: 'linear-gradient(135deg, rgba(220,38,38,0.35) 0%, rgba(153,27,27,0.35) 100%)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(220, 38, 38, 0.45)',
              color: '#FFFFFF',
              padding: '0.6rem 1.1rem',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(220,38,38,0.35)',
              transition: 'all 0.2s ease',
            }}
          >
            <BookOpen size={14} />
            <span>Story View</span>
          </button>
        </div>
      </div>

      {/* ── CHAPTER HUD BADGE (FLOATING CENTER TOP) ─────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentChapter.id}
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            top: '4.8rem',
            left: '50%',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
            zIndex: 35,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              background: 'rgba(8, 11, 20, 0.82)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${currentChapter.color || '#3B82F6'}44`,
              boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 24px ${currentChapter.color || '#3B82F6'}22`,
              padding: '0.6rem 1.6rem',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{currentChapter.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  color: currentChapter.color || '#60A5FA',
                  textTransform: 'uppercase',
                }}
              >
                {currentChapter.stage}
              </div>
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  color: '#FFFFFF',
                  letterSpacing: '0.04em',
                }}
              >
                {currentChapter.title}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── BOTTOM DASHBOARD ────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          pointerEvents: 'none',
          zIndex: 40,
        }}
      >
        {/* Speedometer & Progress HUD */}
        <div
          style={{
            pointerEvents: 'auto',
            background: 'rgba(8, 11, 20, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '0.6rem 1.4rem',
            borderRadius: '999px',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
          }}
        >
          {/* Progress % */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Compass size={15} color="#60A5FA" />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', color: '#FFFFFF' }}>
              {Math.round(progress * 100)}% JOURNEY
            </span>
          </div>

          <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.15)' }} />

          {/* Speed */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '1rem',
                fontWeight: 900,
                color: speed > 60 ? '#F59E0B' : '#60A5FA',
              }}
            >
              {speed}
            </span>
            <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>KM/H</span>
          </div>

          <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.15)' }} />

          {/* Scroll hint */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontWeight: 600 }}>
            <span>Scroll to Drive</span>
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ↓
            </motion.span>
          </div>
        </div>

        {/* Progress Bar Line */}
        <div
          style={{
            width: 'min(420px, 90vw)',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.round(progress * 100)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #EF4444 0%, #DC2626 50%, #991B1B 100%)',
              borderRadius: '999px',
              transition: 'width 0.1s linear',
            }}
          />
        </div>
      </div>

      {/* ── FINISH LINE MODAL (TRIGGERED AT 95%+ SCROLL) ─────── */}
      <AnimatePresence>
        {isFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(5, 5, 7, 0.94)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              zIndex: 50,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: '1rem',
                fontWeight: 800,
                letterSpacing: '0.25em',
                color: '#DC2626',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              🏁 FINISH LINE REACHED
            </div>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: '#FFFFFF',
                marginBottom: '1rem',
              }}
            >
              VULLI AASHIK
            </h1>
            <div
              style={{
                fontSize: 'clamp(1.2rem, 3.5vw, 2rem)',
                fontWeight: 800,
                letterSpacing: '0.12em',
                background: 'linear-gradient(90deg, #FFFFFF, #EF4444)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem',
              }}
            >
              11 YEARS COMPLETED • WELCOME TO YEAR 12 ❤️
            </div>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                fontStyle: 'italic',
                fontFamily: 'Playfair Display, serif',
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '540px',
                marginBottom: '2.5rem',
              }}
            >
              "11 years of memories. A new journey begins."
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button
                onClick={onExitToStory}
                style={{
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #991B1B 100%)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '1rem',
                  padding: '0.9rem 2.2rem',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 30px rgba(220, 38, 38, 0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                }}
              >
                <Sparkles size={18} />
                <span>Enter Birthday Celebration & Story</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
