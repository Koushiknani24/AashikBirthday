import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from './Confetti.jsx';
import { photoManifest } from '../data/photoManifest.js';

const sequence = [
  { id: 'arrived', content: "YOU'VE ARRIVED.", delay: 0 },
  { id: 'name', content: 'VULLI AASHIK', delay: 1.2 },
  { id: 'eleven', content: '11 YEARS COMPLETED', delay: 2.4 },
  { id: 'twelve-num', content: '12', delay: 3.6 },
  { id: 'twelve-label', content: 'YEAR BEGINS NOW', delay: 4.2 },
  { id: 'hbd', content: 'HAPPY BIRTHDAY, AASHIK ❤️', delay: 5.2 },
  { id: 'tagline', content: '11 years completed. A new journey begins.', delay: 6 },
  { id: 'welcome', content: 'WELCOME TO YEAR 12', delay: 7 },
  { id: 'quote', content: '"Keep dreaming. Keep driving. Keep growing."', delay: 7.8 },
  { id: 'love', content: 'WE LOVE YOU, AASHIK ❤️', delay: 8.8 },
];

export default function FinalReveal({ active }) {
  const [confettiActive, setConfettiActive] = useState(false);
  const [visibleItems, setVisibleItems] = useState(new Set());

  // Get latest photo for background
  const latestPhoto = photoManifest
    .filter(p => !p.excludedFromMainStory && (p.stage === 'Recent Years' || p.stage === 'Current') && p.src)
    .slice(-1)[0];

  useEffect(() => {
    if (!active) return;

    // Trigger confetti at the HBD moment
    const confettiTimer = setTimeout(() => {
      setConfettiActive(true);
    }, 5200);

    // Show items progressively
    sequence.forEach(({ id, delay }) => {
      setTimeout(() => {
        setVisibleItems((prev) => new Set([...prev, id]));
      }, delay * 1000);
    });

    return () => {
      clearTimeout(confettiTimer);
    };
  }, [active]);

  if (!active) return null;

  return (
    <>
      <Confetti active={confettiActive} />

      <section
        id="final"
        className="final-reveal"
        style={{
          minHeight: '100dvh',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background photo */}
        {latestPhoto && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
          }}>
            <img
              src={latestPhoto.src}
              alt="Aashik"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.15,
                filter: 'blur(4px)',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(5,5,7,0.85) 0%, rgba(5,5,7,0.65) 50%, rgba(5,5,7,0.98) 100%)',
            }} />
          </div>
        )}

        {/* Background glows in Crimson Red */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.12, 0.28, 0.12],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          style={{
            position: 'absolute',
            width: '750px',
            height: '750px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #DC2626 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1, width: '100%', padding: '4rem 1.5rem' }}>
          <AnimatePresence>
            {/* YOU'VE ARRIVED */}
            {visibleItems.has('arrived') && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: 'clamp(0.8rem, 2vw, 1rem)',
                  fontWeight: 600,
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '2rem',
                }}
              >
                🏁 YOU'VE ARRIVED.
              </motion.div>
            )}

            {/* VULLI AASHIK */}
            {visibleItems.has('name') && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                  background: 'linear-gradient(135deg, #FFFFFF, rgba(255,255,255,0.7))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                VULLI AASHIK
              </motion.div>
            )}

            {/* 11 YEARS COMPLETED */}
            {visibleItems.has('eleven') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.6)',
                  marginBottom: '2.5rem',
                }}
              >
                11 YEARS COMPLETED
              </motion.div>
            )}

            {/* 12 */}
            {visibleItems.has('twelve-num') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{
                  fontSize: 'clamp(6rem, 20vw, 14rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.06em',
                  lineHeight: 0.9,
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #EF4444 45%, #DC2626 75%, #991B1B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 50px rgba(220, 38, 38, 0.6))',
                  marginBottom: '-0.5rem',
                }}
              >
                12
              </motion.div>
            )}

            {/* YEAR BEGINS NOW */}
            {visibleItems.has('twelve-label') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: 'clamp(1rem, 3vw, 1.75rem)',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                  marginBottom: '3rem',
                }}
              >
                YEAR BEGINS NOW
              </motion.div>
            )}

            {/* HAPPY BIRTHDAY */}
            {visibleItems.has('hbd') && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 150, damping: 12 }}
                style={{
                  fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  color: 'white',
                  marginBottom: '1rem',
                  textShadow: '0 0 50px rgba(220, 38, 38, 0.7)',
                }}
              >
                HAPPY BIRTHDAY, AASHIK <span style={{ color: '#DC2626' }}>❤️</span>
              </motion.div>
            )}

            {/* Tagline */}
            {visibleItems.has('tagline') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  color: 'rgba(255,255,255,0.5)',
                  marginBottom: '0.5rem',
                }}
              >
                11 years completed. A new journey begins.
              </motion.div>
            )}

            {/* WELCOME TO YEAR 12 */}
            {visibleItems.has('welcome') && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  fontSize: 'clamp(1.25rem, 3.5vw, 2rem)',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  color: 'white',
                  marginBottom: '1.5rem',
                }}
              >
                WELCOME TO YEAR 12 <span style={{ color: '#DC2626' }}>❤️</span>
              </motion.div>
            )}

            {/* Quote */}
            {visibleItems.has('quote') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
                  color: 'rgba(255,255,255,0.4)',
                  fontStyle: 'italic',
                  fontFamily: 'Playfair Display, serif',
                  marginBottom: '2.5rem',
                }}
              >
                "Keep dreaming. Keep driving. Keep growing."
              </motion.div>
            )}

            {/* WE LOVE YOU */}
            {visibleItems.has('love') && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 120, damping: 10 }}
                style={{
                  fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 50%, #991B1B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 35px rgba(220, 38, 38, 0.45))',
                }}
              >
                WE LOVE YOU, AASHIK ❤️
              </motion.div>
            )}
          </AnimatePresence>

          {/* Date */}
          {visibleItems.has('love') && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                marginTop: '3rem',
                fontSize: '0.8rem',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.2)',
              }}
            >
              09 • 10 • 2026
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
