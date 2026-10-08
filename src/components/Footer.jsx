import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer
      style={{
        padding: '4rem 1.5rem 8rem', // extra bottom padding for road
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        textAlign: 'center',
      }}
    >
      <div className="container">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '0.75rem',
          }}
        >
          VULLI AASHIK
        </motion.div>

        {/* Milestone text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.25)',
            marginBottom: '2.5rem',
          }}
        >
          11 Years Completed • Year 12 Begins
        </motion.div>

        {/* Divider */}
        <div style={{
          width: '40px',
          height: '1px',
          background: 'rgba(255,255,255,0.1)',
          margin: '0 auto 2rem',
        }} />

        {/* Made with love */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.25)',
            marginBottom: '0.5rem',
            fontStyle: 'italic',
          }}
        >
          Made with ❤️ by his brother.
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: '0.75rem',
            color: 'rgba(255,255,255,0.15)',
            letterSpacing: '0.05em',
          }}
        >
          © 2026 Aashik Birthday Memories
        </motion.div>
      </div>
    </footer>
  );
}
