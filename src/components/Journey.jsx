import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhotoModal from './PhotoModal.jsx';
import { photoManifest, storyChapters } from '../data/photoManifest.js';

// Placeholder card when no photos are present
function PlaceholderCard({ chapter, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      style={{
        aspectRatio: index % 3 === 0 ? '16/9' : '4/5',
        background: 'rgba(255,255,255,0.03)',
        border: '2px dashed rgba(255,255,255,0.08)',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        padding: '2rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ fontSize: '2.5rem', opacity: 0.4 }}>📸</div>
      <div style={{
        fontSize: '0.75rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.2)',
        textAlign: 'center',
        fontWeight: 600,
      }}>
        Add your photo here
      </div>
      <div style={{
        fontSize: '0.7rem',
        color: 'rgba(255,255,255,0.12)',
        textAlign: 'center',
      }}>
        Place photos in /public/photos/<br />and update photoManifest.js
      </div>
    </motion.div>
  );
}

// Real photo card with face-centered alignment
function PhotoCard({ photo, index, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) return null;

  return (
    <motion.div
      className="photo-container"
      style={{
        aspectRatio: '4/5',
        borderRadius: '16px',
        cursor: 'pointer',
        overflow: 'hidden',
        background: '#0B0B0E',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)',
      }}
      initial={{ opacity: 0, scale: 0.96, y: 35 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.07, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ scale: 1.025, borderColor: 'rgba(220, 38, 38, 0.5)' }}
      onClick={() => onClick(index)}
    >
      {!loaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: '2rem', opacity: 0.2 }}>📸</div>
        </div>
      )}
      <img
        src={photo.src}
        alt={photo.caption || photo.stage || 'Aashik memory'}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 18%', // Aligns faces in the upper portion clearly
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      />
      <div className="photo-overlay" style={{
        background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,7,0.92) 100%)',
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '1.25rem',
      }}>
        <div style={{
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#DC2626',
          marginBottom: '0.25rem',
        }}>
          {photo.stage} {photo.age ? `• AGE ${photo.age}` : ''}
        </div>
        {photo.caption && (
          <div style={{
            fontSize: '0.85rem',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: 500,
            lineHeight: 1.35,
            textShadow: '0 1px 4px rgba(0,0,0,0.8)',
          }}>
            {photo.caption}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// Chapter section — shows a chapter header + its photos
function ChapterSection({ chapter, photos }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (idx) => {
    setModalIndex(idx);
    setModalOpen(true);
  };

  return (
    <section id={chapter.id} style={{ padding: '5rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      {/* Chapter header */}
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '3rem', textAlign: 'center' }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{chapter.icon}</div>
        <div style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: chapter.color || 'rgba(255,255,255,0.4)',
          marginBottom: '0.5rem',
        }}>
          — Chapter —
        </div>
        <h2 style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: 'white',
          marginBottom: '0.75rem',
        }}>
          {chapter.title}
        </h2>
        <div style={{
          width: '50px',
          height: '2px',
          background: `linear-gradient(90deg, ${chapter.color || '#3B82F6'}, transparent)`,
          margin: '0 auto 1rem',
          borderRadius: '100px',
        }} />
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: 'rgba(255,255,255,0.5)',
          fontStyle: 'italic',
          fontFamily: 'Playfair Display, serif',
          maxWidth: '500px',
          margin: '0 auto',
        }}>
          "{chapter.subtitle}"
        </p>
      </motion.div>

      {/* Photos grid */}
      <div className="container">
        {photos.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem',
          }}>
            {photos.map((photo, i) => (
              <PhotoCard
                key={photo.src || i}
                photo={photo}
                index={i}
                onClick={openModal}
              />
            ))}
          </div>
        ) : (
          // Placeholder grid when no photos
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem',
          }}>
            {Array.from({ length: chapter.id === 'brothers' || chapter.id === 'family' ? 2 : 3 }).map((_, i) => (
              <PlaceholderCard key={i} chapter={chapter} index={i} />
            ))}
          </div>
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

export default function Journey() {
  // Filter and group photos by chapter
  const getPhotosForChapter = (chapter) => {
    if (!photoManifest || photoManifest.length === 0) return [];

    const activePhotos = photoManifest.filter(p => !p.excludedFromMainStory);

    if (chapter.id === 'baby') {
      return activePhotos.filter(p => p.stage === 'Baby Years');
    }
    if (chapter.id === 'early-childhood') {
      return activePhotos.filter(p => p.stage === 'Childhood');
    }
    if (chapter.id === 'troublemaker') {
      return activePhotos.filter(p => p.stage === 'Troublemaker' || p.role === 'funny');
    }
    if (chapter.id === 'school') {
      return activePhotos.filter(p => p.stage === 'School' || p.role === 'school');
    }
    if (chapter.id === 'brothers') {
      return activePhotos.filter(p => p.stage === 'Brothers' || p.role === 'siblings');
    }
    if (chapter.id === 'parents') {
      return activePhotos.filter(p => p.stage === 'Parents' || p.role === 'parents');
    }
    if (chapter.id === 'family') {
      return activePhotos.filter(p => p.stage === 'Family' || p.role === 'family');
    }
    if (chapter.id === 'travel') {
      return activePhotos.filter(p => p.stage === 'Travel' || p.role === 'travel');
    }
    if (chapter.id === 'cars') {
      return activePhotos.filter(p => p.stage === 'Cars' || p.role === 'cars');
    }
    if (chapter.id === 'recent') {
      return activePhotos.filter(p => p.stage === 'Recent' || p.role === 'recent');
    }
    if (chapter.id === 'eleven') {
      return activePhotos.filter(p => p.priority === 'high' && (p.stage === 'Recent' || p.age === '11'));
    }

    return activePhotos.filter(p => p.stage === chapter.stage);
  };

  return (
    <div id="journey">
      {storyChapters.map((chapter) => (
        <ChapterSection
          key={chapter.id}
          chapter={chapter}
          photos={getPhotosForChapter(chapter)}
        />
      ))}
    </div>
  );
}
