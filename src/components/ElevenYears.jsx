import { motion } from 'framer-motion';

export default function ElevenYears() {
  return (
    <section
      style={{
        padding: '8rem 1.5rem',
        background: 'linear-gradient(180deg, #050507 0%, #0B0B0E 50%, #050507 100%)',
        textAlign: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle radial glow in crimson red */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          position: 'absolute',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #DC2626 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#DC2626',
            marginBottom: '1.5rem',
          }}
        >
          — The Milestone —
        </motion.div>

        {/* Big 11 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: 'spring', stiffness: 100, damping: 14 }}
          style={{
            fontSize: 'clamp(8rem, 30vw, 20rem)',
            fontWeight: 900,
            letterSpacing: '-0.06em',
            lineHeight: 0.85,
            background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255,255,255,0.7) 45%, #EF4444 80%, #991B1B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 0 50px rgba(220, 38, 38, 0.35))',
            marginBottom: '0.5rem',
          }}
        >
          11
        </motion.div>

        {/* YEARS COMPLETED */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontSize: 'clamp(1.25rem, 3.5vw, 2rem)',
            fontWeight: 800,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.85)',
            marginBottom: '3rem',
          }}
        >
          YEARS COMPLETED <span style={{ color: '#DC2626' }}>⭐</span>
        </motion.div>

        {/* Quote 1 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            fontStyle: 'italic',
            fontFamily: 'Playfair Display, serif',
            color: 'rgba(255,255,255,0.6)',
            maxWidth: '600px',
            margin: '0 auto 1rem',
            lineHeight: 1.7,
          }}
        >
          "From tiny footsteps to big dreams."
        </motion.p>

        {/* Quote 2 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: 'rgba(255,255,255,0.4)',
            maxWidth: '500px',
            margin: '0 auto 4rem',
            lineHeight: 1.8,
          }}
        >
          11 years. Countless memories. And so much more ahead.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.9 }}
          style={{
            width: '240px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(220,38,38,0.7), transparent)',
            margin: '0 auto',
          }}
        />
      </div>
    </section>
  );
}
