import { motion } from 'framer-motion';
import { familyMessages } from '../data/messages.js';

export default function FamilyMessages() {
  return (
    <section
      id="messages"
      style={{
        padding: '6rem 1.5rem',
        background: '#050507',
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
            ❤️ With Love
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'white',
            marginBottom: '0.75rem',
          }}>
            WORDS FROM THE PEOPLE WHO LOVE YOU
          </h2>
          <div className="divider" />
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontStyle: 'italic',
            fontFamily: 'Playfair Display, serif',
            fontSize: '1.05rem',
          }}>
            "Every journey needs people who believe in you."
          </p>
        </motion.div>

        {/* Messages */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {familyMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              className="message-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.15,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              style={{
                borderTop: `2px solid ${msg.color}40`,
              }}
            >
              {/* Color accent glow */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: `linear-gradient(180deg, ${msg.color}08 0%, transparent 100%)`,
                pointerEvents: 'none',
              }} />

              {/* From header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', position: 'relative' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: `${msg.color}20`,
                  border: `1px solid ${msg.color}40`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  flexShrink: 0,
                }}>
                  {msg.emoji}
                </div>
                <div>
                  <div className="message-from" style={{ color: msg.color }}>
                    {msg.from}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>
                    {msg.role}
                  </div>
                </div>
              </div>

              {/* Message text */}
              <p className="message-text">
                {msg.message}
              </p>

              {/* Signature */}
              <div style={{
                marginTop: '1.5rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <div style={{ height: '1px', flex: 1, background: `${msg.color}20` }} />
                <div style={{ fontSize: '0.7rem', color: `${msg.color}70`, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  — {msg.from}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
