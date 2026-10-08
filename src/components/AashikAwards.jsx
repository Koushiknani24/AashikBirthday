import { motion } from 'framer-motion';

const awards = [
  {
    emoji: '🏆',
    title: 'Best Smile',
    desc: 'Officially the most contagious smile in the family.',
    color: '#DC2626',
  },
  {
    emoji: '😂',
    title: 'Official Family Troublemaker',
    desc: 'The mischief evidence has existed since day one.',
    color: '#EF4444',
  },
  {
    emoji: '📸',
    title: 'Most Photographed Star',
    desc: 'No camera in the world could resist this handsome face.',
    color: '#B91C1C',
  },
  {
    emoji: '🚗',
    title: 'Master Car Enthusiast',
    desc: 'Speed in the veins. Knows every supercar on the highway.',
    color: '#DC2626',
  },
  {
    emoji: '❤️',
    title: 'Family Favorite',
    desc: 'Unanimous favorite across all three generations.',
    color: '#E11D48',
  },
  {
    emoji: '😎',
    title: 'Milestone 11 Legend',
    desc: '11 years completed like an absolute champion.',
    color: '#991B1B',
  },
];

export default function AashikAwards() {
  return (
    <section
      id="awards"
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
            🏆 Official Recognition
          </span>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'white',
            marginBottom: '0.75rem',
          }}>
            THE AASHIK AWARDS
          </h2>
          <div className="divider divider-gold" />
          <p style={{
            color: 'rgba(255,255,255,0.5)',
            fontStyle: 'italic',
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.1rem',
          }}>
            "Presented with love. And absolutely zero bias."
          </p>
        </motion.div>

        {/* Awards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}>
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              className="award-card"
              initial={{ opacity: 0, y: 40, rotate: -2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              whileHover={{
                y: -8,
                rotate: (i % 2 === 0 ? 1 : -1),
                transition: { duration: 0.25 },
              }}
              style={{
                borderTop: `2px solid ${award.color}30`,
              }}
            >
              {/* Glow */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '80px',
                background: `radial-gradient(circle, ${award.color}20 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              <span className="award-emoji">{award.emoji}</span>
              <div className="award-title" style={{ color: award.color }}>
                {award.title}
              </div>
              <div className="award-desc">{award.desc}</div>

              {/* Certificate decoration */}
              <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                opacity: 0.3,
              }}>
                <div style={{ height: '1px', width: '30px', background: award.color }} />
                <div style={{ fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: award.color }}>
                  Certified
                </div>
                <div style={{ height: '1px', width: '30px', background: award.color }} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
