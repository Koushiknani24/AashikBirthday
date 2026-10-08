import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function VideoSection({ videoSrc = '/videos/aashik12.mp4' }) {
  const [exists, setExists] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Check if video file exists
    fetch(videoSrc, { method: 'HEAD' })
      .then((res) => setExists(res.ok))
      .catch(() => setExists(false));
  }, [videoSrc]);

  // Don't render if video doesn't exist
  if (exists === false) return null;

  // Loading state
  if (exists === null) return null;

  return (
    <section
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
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            🎥 Video
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'white',
            marginBottom: '0.75rem',
          }}>
            11 YEARS IN 60 SECONDS
          </h2>
          <div className="divider" />
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontStyle: 'italic',
            fontFamily: 'Playfair Display, serif',
          }}>
            "A lifetime of memories, condensed."
          </p>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            borderRadius: '20px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.8)',
          }}
        >
          <video
            ref={videoRef}
            controls
            playsInline
            preload="metadata"
            style={{ width: '100%', display: 'block', background: '#000' }}
            aria-label="Aashik 11 years video"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
}
