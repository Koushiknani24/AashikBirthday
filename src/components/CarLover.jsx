import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// The 3 Sketchfab car models curated for Aashik in Black + Crimson Red Automotive Styling
const carModels = [
  {
    id: 'bmw-m8',
    name: 'BMW M8 Competition',
    subtitle: 'The Ultimate Dream',
    embed: 'https://sketchfab.com/models/29edbd63b48c427c9871648c9357c0ac/embed',
    credit: 'Cassana XR',
    color: '#DC2626',
    glow: 'rgba(220,38,38,0.4)',
    description: 'V8 Twin-Turbo. 617 HP. Precision and raw presence.',
    badge: '🏆 Ultimate Dream',
  },
  {
    id: 'violet-bmw',
    name: 'BMW M-Performance',
    subtitle: 'Aggressive & Aerodynamic',
    embed: 'https://sketchfab.com/models/38ae8a1e5e7246eba507d95cc9b4a192/embed',
    credit: 'Cassana XR',
    color: '#B91C1C',
    glow: 'rgba(185,28,28,0.4)',
    description: 'Track-bred engineering with a commanding stance.',
    badge: '🔥 Track Machine',
  },
  {
    id: 'mazda-racing',
    name: 'Mazda Savanna S124A',
    subtitle: 'Classic Rotary Spirit',
    embed: 'https://sketchfab.com/models/cf1e9c42c97845e5ae84a442e05ec0b1/embed',
    credit: 'Joko_P',
    color: '#EF4444',
    glow: 'rgba(239,68,68,0.4)',
    description: 'Lightweight heritage racer built for curves and speed.',
    badge: '🏎️ Classic Racer',
  },
];

export default function CarLover() {
  const [activeModel, setActiveModel] = useState(0);
  const [loaded, setLoaded] = useState({});

  const current = carModels[activeModel];

  const handleLoad = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="cars"
      style={{
        padding: '6rem 0 0',
        background: 'linear-gradient(180deg, #050507 0%, #0B0B0E 50%, #050507 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Ambient glow behind car */}
      <motion.div
        key={current.id}
        animate={{ opacity: [0, 1], scale: [0.8, 1] }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${current.glow} 0%, transparent 70%)`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.35,
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            🚗 Passion
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'white',
            marginBottom: '0.75rem',
          }}>
            THE CAR & SPEED LOVER 🚗
          </h2>
          <div className="divider" style={{
            background: 'linear-gradient(90deg, transparent, #DC2626, transparent)',
            height: '2px',
            width: '80px',
            margin: '0.5rem auto 1rem',
          }} />
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontStyle: 'italic',
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.1rem',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            "It started young. The love for cars was never a phase."
          </p>
        </motion.div>

        {/* Car selector tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '0.75rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem',
          }}
        >
          {carModels.map((car, i) => (
            <motion.button
              key={car.id}
              onClick={() => setActiveModel(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '0.6rem 1.25rem',
                background: activeModel === i
                  ? `linear-gradient(135deg, ${car.color}30, ${car.color}15)`
                  : 'rgba(255,255,255,0.04)',
                border: `1px solid ${activeModel === i ? car.color : 'rgba(255,255,255,0.1)'}`,
                borderRadius: '100px',
                color: activeModel === i ? 'white' : 'rgba(255,255,255,0.5)',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeModel === i ? `0 0 20px ${car.glow}` : 'none',
              }}
            >
              {car.name}
            </motion.button>
          ))}
        </motion.div>

        {/* 3D Car Embed */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeModel}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45 }}
            style={{ position: 'relative' }}
          >
            {/* Loading state */}
            {!loaded[current.id] && (
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                background: 'rgba(8,11,20,0.9)',
                borderRadius: '20px',
                zIndex: 2,
              }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: `2px solid ${current.color}`,
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                  }}
                />
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
                  Loading 3D model...
                </div>
              </div>
            )}

            {/* Sketchfab 3D iframe */}
            <div style={{
              borderRadius: '20px',
              overflow: 'hidden',
              border: `1px solid ${current.color}30`,
              boxShadow: `0 0 60px ${current.glow}, 0 32px 80px rgba(0,0,0,0.8)`,
              aspectRatio: '16/9',
              background: '#000',
            }}>
              <iframe
                title={current.name}
                src={`${current.embed}?autostart=1&ui_theme=dark&ui_watermark=0&ui_infos=0&ui_inspector=0&ui_controls=1&ui_stop=0&camera=0&transparent=0&preload=1`}
                frameBorder="0"
                allowFullScreen
                allow="autoplay; fullscreen; xr-spatial-tracking"
                onLoad={() => handleLoad(current.id)}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
                aria-label={`3D model of ${current.name}`}
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Car info card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`info-${activeModel}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginTop: '1.75rem',
              padding: '1.25rem 1.75rem',
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${current.color}20`,
              borderRadius: '16px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  background: `${current.color}20`,
                  border: `1px solid ${current.color}40`,
                  borderRadius: '100px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  color: current.color,
                  letterSpacing: '0.05em',
                }}>
                  {current.badge}
                </span>
              </div>
              <div style={{ fontSize: 'clamp(1.1rem, 3vw, 1.5rem)', fontWeight: 800, color: 'white', letterSpacing: '-0.02em' }}>
                {current.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', marginTop: '0.2rem', fontStyle: 'italic' }}>
                {current.description}
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
              <div>3D Model by</div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>{current.credit}</div>
              <div style={{ color: 'rgba(255,255,255,0.2)' }}>on Sketchfab</div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Interaction hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          style={{
            textAlign: 'center',
            marginTop: '1rem',
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.06em',
          }}
        >
          🖱️ Click &amp; drag to rotate • Scroll to zoom • Tap on mobile
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div style={{
        marginTop: '4rem',
        height: '80px',
        background: 'linear-gradient(180deg, transparent, #000)',
      }} />
    </section>
  );
}
