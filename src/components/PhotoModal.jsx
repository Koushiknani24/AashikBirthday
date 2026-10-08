import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PhotoModal({ photos, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef(null);

  const photo = photos[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + photos.length) % photos.length);
  }, [photos.length]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
    if (e.key === 'Escape') onClose();
  }, [goNext, goPrev, onClose]);

  // Touch swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }}
        >
          {/* Close button */}
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close photo viewer"
          >
            <X size={18} />
          </button>

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={photo.src}
              alt={photo.caption || photo.stage || 'Aashik memory'}
              className="modal-img"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>

          {/* Caption */}
          {(photo.caption || photo.stage) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                marginTop: '1rem',
                textAlign: 'center',
              }}
            >
              {photo.stage && (
                <div className="text-caption" style={{ marginBottom: '0.3rem' }}>
                  {photo.stage}
                </div>
              )}
              {photo.caption && (
                <div style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,0.8)',
                  fontStyle: 'italic',
                }}>
                  {photo.caption}
                </div>
              )}
            </motion.div>
          )}

          {/* Photo count */}
          <div style={{
            textAlign: 'center',
            marginTop: '0.75rem',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.05em',
          }}>
            {currentIndex + 1} / {photos.length}
          </div>

          {/* Navigation arrows */}
          {photos.length > 1 && (
            <>
              <motion.button
                onClick={goPrev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'fixed',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                }}
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                onClick={goNext}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: 'fixed',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0,0,0,0.7)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                }}
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
