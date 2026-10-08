import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';

// Components
import Navigation from './components/Navigation.jsx';
import Hero from './components/Hero.jsx';
import Journey from './components/Journey.jsx';
import CarLover from './components/CarLover.jsx';
import ThenNowSlider from './components/ThenNowSlider.jsx';
import ElevenYears from './components/ElevenYears.jsx';
import AashikAwards from './components/AashikAwards.jsx';
import BirthdayQuiz from './components/BirthdayQuiz.jsx';
import FamilyMessages from './components/FamilyMessages.jsx';
import MemoryWall from './components/MemoryWall.jsx';
import VideoSection from './components/VideoSection.jsx';
import FinalReveal from './components/FinalReveal.jsx';
import CarJourney from './components/CarJourney.jsx';
import ThreeWorld from './components/ThreeWorld.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import Footer from './components/Footer.jsx';

// ─────────────────────────────────────────────────────────────
// THEN/NOW PHOTO CONFIGURATION
// Set these paths to your two comparison photos:
//   thenNowBefore → early/baby photo
//   thenNowAfter  → most recent photo of Aashik
// Leave empty strings if you don't have comparison photos yet.
// ─────────────────────────────────────────────────────────────
const THEN_NOW_BEFORE = '/photos/small.jpeg';
const THEN_NOW_AFTER  = '/photos/whatsapp_image_2026-10-08_at_6.31.42_pm.jpeg';

export default function App() {
  const [viewMode, setViewMode] = useState('story'); // 'story' | '3d'
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [finalRevealed, setFinalRevealed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const finalRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Track scroll progress for nav bar
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setScrollProgress(v);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Trigger final reveal when user scrolls near the bottom
  useEffect(() => {
    if (!journeyStarted) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setFinalRevealed(true);
      },
      { threshold: 0.1 }
    );
    if (finalRef.current) observer.observe(finalRef.current);
    return () => observer.disconnect();
  }, [journeyStarted]);

  const handleStartJourney = () => {
    setJourneyStarted(true);
    // Smooth scroll past hero
    setTimeout(() => {
      const el = document.getElementById('journey');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  if (viewMode === '3d') {
    return <ThreeWorld onExitToStory={() => setViewMode('story')} />;
  }

  return (
    <div style={{ background: '#050507', minHeight: '100dvh' }}>
      {/* Fixed Navigation */}
      <Navigation
        scrollProgress={scrollProgress}
        onToggle3D={() => setViewMode('3d')}
        is3DActive={false}
      />

      {/* Fixed scroll-driven car on road */}
      <CarJourney />

      {/* Fixed music player */}
      <MusicPlayer audioSrc="/audio/birthday.mp3" />

      {/* Floating 3D Drive launcher button in Crimson Red theme */}
      <motion.button
        onClick={() => setViewMode('3d')}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.96 }}
        style={{
          position: 'fixed',
          bottom: '88px',
          right: '1.25rem',
          zIndex: 45,
          background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #991B1B 100%)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '999px',
          padding: '0.65rem 1.25rem',
          fontSize: '0.82rem',
          fontWeight: 800,
          letterSpacing: '0.06em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 8px 24px rgba(220, 38, 38, 0.55)',
          cursor: 'pointer',
        }}
        title="Experience the interactive 3D WebGL highway drive"
      >
        <span style={{ fontSize: '1rem' }}>🏎️</span>
        <span>3D Drive Mode</span>
      </motion.button>

      {/* ── HERO ─────────────────────────────────────── */}
      <Hero
        onStartJourney={handleStartJourney}
        onStart3D={() => setViewMode('3d')}
      />

      {/* ── JOURNEY SECTIONS ─────────────────────────── */}
      <AnimatePresence>
        {journeyStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Story chapters (baby → school → family → cars etc.) */}
            <Journey />

            {/* Dedicated 3D Car Lover section with Sketchfab models */}
            <CarLover />

            {/* Memory wall gallery */}
            <MemoryWall />

            {/* Then → Now comparison slider */}
            <ThenNowSlider
              beforeSrc={THEN_NOW_BEFORE}
              afterSrc={THEN_NOW_AFTER}
              beforeLabel="Little Aashik"
              afterLabel="Aashik Today"
            />

            {/* 11 Years Completed milestone */}
            <ElevenYears />

            {/* Aashik Awards */}
            <AashikAwards />

            {/* Quiz section */}
            <BirthdayQuiz />

            {/* Family Messages */}
            <FamilyMessages />

            {/* Video section (auto-hides if no video file) */}
            <VideoSection videoSrc="/videos/aashik12.mp4" />

            {/* Final reveal trigger point */}
            <div ref={finalRef} style={{ height: '1px' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FINAL REVEAL ─────────────────────────────── */}
      <FinalReveal active={finalRevealed} />

      {/* ── FOOTER ───────────────────────────────────── */}
      {journeyStarted && (
        <Footer />
      )}

      {/* ── GLOBAL STYLES OVERRIDE ───────────────────── */}
      <style>{`
        body {
          padding-bottom: 80px; /* space for fixed road */
        }

        @media (max-width: 768px) {
          body {
            padding-bottom: 62px;
          }
        }

        /* Smooth focus ring */
        :focus-visible {
          outline: 2px solid rgba(59, 130, 246, 0.6);
          outline-offset: 3px;
          border-radius: 4px;
        }

        /* Selection color */
        ::selection {
          background: rgba(59, 130, 246, 0.3);
          color: white;
        }
      `}</style>
    </div>
  );
}
