import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ThenNowSlider({ beforeSrc, afterSrc, beforeLabel = 'Little Aashik', afterLabel = 'Aashik Today' }) {
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const [beforeLoaded, setBeforeLoaded] = useState(false);
  const [afterLoaded, setAfterLoaded] = useState(false);
  const noPhotos = !beforeSrc && !afterSrc;

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(Math.max(x, 2), 98));
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleMouseMove = useCallback((e) => {
    if (!dragging) return;
    updatePosition(e.clientX);
  }, [dragging, updatePosition]);

  const handleMouseUp = useCallback(() => setDragging(false), []);

  const handleTouchMove = useCallback((e) => {
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  }, [updatePosition]);

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging, handleMouseMove, handleMouseUp]);

  return (
    <section
      id="memories"
      style={{
        padding: '6rem 1.5rem',
        background: 'linear-gradient(180deg, #050507 0%, #0B0B0E 50%, #050507 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="container-sm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            ✨ Time Travel
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'white',
            marginBottom: '0.75rem',
          }}>
            THEN → NOW
          </h2>
          <div className="divider" />
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontStyle: 'italic',
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.1rem',
          }}>
            "Look how far you've come."
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          {noPhotos ? (
            /* Placeholder state */
            <div style={{
              aspectRatio: '16/9',
              background: 'rgba(255,255,255,0.03)',
              border: '2px dashed rgba(255,255,255,0.08)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              padding: '3rem',
            }}>
              <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', opacity: 0.3, marginBottom: '0.5rem' }}>👶</div>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Then</div>
                </div>
                <div style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.15)' }}>→</div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', opacity: 0.3, marginBottom: '0.5rem' }}>😎</div>
                  <div style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Now</div>
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', lineHeight: 1.8 }}>
                Set <code style={{ background: 'rgba(255,255,255,0.08)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>thenNowBefore</code> and <code style={{ background: 'rgba(255,255,255,0.08)', padding: '0.1rem 0.4rem', borderRadius: '4px' }}>thenNowAfter</code><br />
                in App.jsx to enable this slider
              </div>
            </div>
          ) : (
            /* Actual slider */
            <div
              ref={containerRef}
              className="then-now-container"
              style={{
                aspectRatio: '4/3',
                userSelect: 'none',
                borderRadius: '20px',
                overflow: 'hidden',
                cursor: dragging ? 'grabbing' : 'col-resize',
                position: 'relative',
                background: '#0A0C10',
              }}
              onMouseDown={(e) => updatePosition(e.clientX) || setDragging(true)}
              onTouchStart={(e) => updatePosition(e.touches[0].clientX)}
              onTouchMove={handleTouchMove}
            >
              {/* AFTER (right side) — full width */}
              {afterSrc && (
                <img
                  src={afterSrc}
                  alt="Aashik now"
                  loading="lazy"
                  onLoad={() => setAfterLoaded(true)}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: afterLoaded ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                />
              )}

              {/* BEFORE (left side) — clipped */}
              {beforeSrc && (
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  width: `${position}%`,
                  overflow: 'hidden',
                }}>
                  <img
                    src={beforeSrc}
                    alt="Aashik then"
                    loading="lazy"
                    onLoad={() => setBeforeLoaded(true)}
                    style={{
                      width: `${100 / (position / 100)}%`,
                      height: '100%',
                      objectFit: 'cover',
                      opacity: beforeLoaded ? 1 : 0,
                      transition: 'opacity 0.4s ease',
                    }}
                  />
                </div>
              )}

              {/* Handle line */}
              <div
                className="then-now-handle"
                style={{
                  left: `${position}%`,
                  background: '#DC2626',
                  boxShadow: '0 0 16px rgba(220, 38, 38, 0.8)',
                }}
                onMouseDown={handleMouseDown}
              >
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '44px',
                  height: '44px',
                  background: '#0B0B0E',
                  border: '2px solid #DC2626',
                  borderRadius: '50%',
                  boxShadow: '0 0 25px rgba(220, 38, 38, 0.6), 0 4px 20px rgba(0,0,0,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3L2 8L6 13" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 3L14 8L10 13" stroke="#DC2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Labels */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                padding: '0.4rem 0.9rem',
                background: 'rgba(5,5,7,0.85)',
                border: '1px solid rgba(220, 38, 38, 0.35)',
                borderRadius: '100px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                backdropFilter: 'blur(10px)',
                zIndex: 5,
              }}>
                {beforeLabel}
              </div>
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                padding: '0.4rem 0.9rem',
                background: 'rgba(5,5,7,0.85)',
                border: '1px solid rgba(220, 38, 38, 0.35)',
                borderRadius: '100px',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                backdropFilter: 'blur(10px)',
                zIndex: 5,
              }}>
                {afterLabel}
              </div>
            </div>
          )}
        </motion.div>

        {/* Instructions */}
        {!noPhotos && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            style={{
              textAlign: 'center',
              marginTop: '1rem',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.05em',
            }}
          >
            ← Drag to compare →
          </motion.div>
        )}
      </div>
    </section>
  );
}
