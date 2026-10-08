import { useState } from 'react';
import { motion } from 'framer-motion';
import PhotoModal from './PhotoModal.jsx';
import { photoManifest } from '../data/photoManifest.js';

export default function MemoryWall() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // Get active photos for memory wall
  const photos = photoManifest.filter(p => !p.excludedFromMainStory && p.src);

  const openModal = (i) => {
    setModalIndex(i);
    setModalOpen(true);
  };

  return (
    <section
      id="gallery"
      style={{
        padding: '6rem 1.5rem',
        background: 'linear-gradient(180deg, #050507 0%, #0B0B0E 50%, #050507 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            📸 Memory Wall
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'white',
            marginBottom: '0.75rem',
          }}>
            11 YEARS
          </h2>
          <div className="divider" />
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontStyle: 'italic',
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.1rem',
          }}>
            "One little life. So many memories."
          </p>
        </motion.div>

        {photos.length > 0 ? (
          /* Real photo masonry */
          <div style={{
            columns: 'auto 240px',
            columnGap: '1rem',
          }}>
            {photos.map((photo, i) => (
              <motion.div
                key={photo.src || i}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '1rem',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  transform: `rotate(${(i % 5 - 2) * 0.4}deg)`,
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 8) * 0.06 }}
                whileHover={{ scale: 1.03, rotate: 0, zIndex: 10 }}
                onClick={() => openModal(i)}
              >
                <img
                  src={photo.src}
                  alt={photo.caption || photo.stage || 'Aashik memory'}
                  loading="lazy"
                  style={{
                    width: '100%',
                    display: 'block',
                    borderRadius: '14px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                  }}
                  onError={(e) => { e.target.closest('div').style.display = 'none'; }}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Placeholder grid */
          <div style={{
            columns: 'auto 200px',
            columnGap: '1rem',
          }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                style={{
                  breakInside: 'avoid',
                  marginBottom: '1rem',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.03)',
                  border: '2px dashed rgba(255,255,255,0.06)',
                  aspectRatio: i % 3 === 0 ? '4/5' : i % 3 === 1 ? '1/1' : '3/4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `rotate(${(i % 5 - 2) * 0.4}deg)`,
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div style={{ fontSize: '2rem', opacity: 0.15 }}>📸</div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Photo count */}
        {photos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.08em',
            }}
          >
            {photos.length} memories • Click any photo to explore
          </motion.div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && photos.length > 0 && (
        <PhotoModal
          photos={photos}
          initialIndex={modalIndex}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}
