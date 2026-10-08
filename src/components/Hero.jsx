import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayConfig } from '../config/birthday.js';

export default function Hero({ onStartJourney, onStart3D }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
    }
  };

  return (
    <section className="hero" id="hero">
      {/* Animated background elements */}
      <div className="hero-bg">
        {/* Subtle cinematic ambient glows */}
        <motion.div
          className="hero-glow"
          style={{
            width: '650px',
            height: '650px',
            background: 'radial-gradient(circle, #DC2626 0%, transparent 70%)',
            top: '-15%',
            left: '-10%',
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-glow"
          style={{
            width: '550px',
            height: '550px',
            background: 'radial-gradient(circle, #991B1B 0%, transparent 70%)',
            bottom: '-10%',
            right: '-10%',
          }}
          animate={{
            scale: [1.15, 1, 1.15],
            opacity: [0.14, 0.08, 0.14],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="hero-glow"
          style={{
            width: '320px',
            height: '320px',
            background: 'radial-gradient(circle, #1E3A8A 0%, transparent 70%)',
            top: '35%',
            left: '55%',
          }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.06, 0.12, 0.06],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Subtle grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />

        {/* Deep black gradient vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 35%, rgba(5,5,7,0.92) 100%)',
        }} />
      </div>

      {/* Content */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Pre-title badge */}
        <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
          <span className="badge">
            <span>✨</span>
            <span>A Birthday Story</span>
          </span>
        </motion.div>

        {/* Main name */}
        <motion.div variants={itemVariants}>
          <div style={{
            fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '0.5rem'
          }}>
            Celebrating
          </div>
          <h1 className="text-hero" style={{
            marginBottom: '0.25rem',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            VULLI
          </h1>
          <h1 className="text-hero" style={{
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #991B1B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 30px rgba(220, 38, 38, 0.4))',
          }}>
            AASHIK
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants}>
          <div className="divider" style={{
            margin: '0 auto 2rem',
            background: 'linear-gradient(90deg, transparent, #DC2626, transparent)',
            height: '2px',
            width: '80px',
          }} />
        </motion.div>

        {/* 11 Years Completed */}
        <motion.div variants={itemVariants} style={{ marginBottom: '0.75rem' }}>
          <div style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.75rem)',
            fontWeight: 800,
            letterSpacing: '-0.01em',
            color: 'white',
          }}>
            11 YEARS COMPLETED
          </div>
        </motion.div>

        {/* Welcome to Year 12 */}
        <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
          <div style={{
            fontSize: 'clamp(0.95rem, 2.5vw, 1.35rem)',
            fontWeight: 600,
            letterSpacing: '0.05em',
            color: 'rgba(255,255,255,0.75)',
          }}>
            WELCOME TO YEAR 12 <span style={{ color: '#DC2626' }}>❤️</span>
          </div>
        </motion.div>

        {/* Date */}
        <motion.div variants={itemVariants} style={{ marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.6rem 1.6rem',
            background: 'rgba(20, 20, 26, 0.7)',
            border: '1px solid rgba(220, 38, 38, 0.25)',
            borderRadius: '100px',
            fontSize: '0.95rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.85)',
          }}>
            <span>09</span>
            <span style={{ color: '#DC2626' }}>•</span>
            <span>10</span>
            <span style={{ color: '#DC2626' }}>•</span>
            <span>2026</span>
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={itemVariants} style={{ marginBottom: '3rem' }}>
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: 'rgba(255,255,255,0.6)',
            fontStyle: 'italic',
            fontFamily: 'Playfair Display, serif',
          }}>
            "11 years of memories. A new journey begins."
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <motion.button
            className="btn btn-primary btn-lg"
            onClick={onStartJourney}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #991B1B 100%)',
              boxShadow: '0 4px 28px rgba(220, 38, 38, 0.55)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
            }}
          >
            <span>START THE JOURNEY</span>
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </motion.button>

          <motion.button
            className="btn btn-lg"
            onClick={onStart3D}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              fontSize: '1rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(15, 15, 20, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span style={{ color: '#DC2626' }}>🏎️</span>
            <span>3D CINEMATIC DRIVE</span>
          </motion.button>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          variants={itemVariants}
          style={{ marginTop: '3rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', letterSpacing: '0.1em' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓ Scroll to explore
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
