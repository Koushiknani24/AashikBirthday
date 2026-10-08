import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Journey', href: '#journey' },
  { label: 'Memories', href: '#memories' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Messages', href: '#messages' },
];

export default function Navigation({ scrollProgress, onToggle3D, is3DActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`nav ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          AASHIK
        </a>

        {/* Desktop nav */}
        <ul className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => { e.preventDefault(); handleLink(link.href); }}>
                {link.label}
              </a>
            </li>
          ))}
          {onToggle3D && (
            <li>
              <button
                onClick={onToggle3D}
                style={{
                  background: is3DActive
                    ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
                    : 'rgba(20, 20, 26, 0.85)',
                  border: '1px solid rgba(220, 38, 38, 0.45)',
                  color: '#FFFFFF',
                  padding: '0.45rem 1rem',
                  borderRadius: '999px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: is3DActive ? '0 4px 18px rgba(220, 38, 38, 0.5)' : '0 2px 10px rgba(0,0,0,0.5)',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{is3DActive ? '📜 Story View' : '🏎️ 3D Drive'}</span>
              </button>
            </li>
          )}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding: '0.5rem',
            color: 'white',
            cursor: 'pointer',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: '64px',
              left: 0,
              right: 0,
              background: 'rgba(5, 5, 7, 0.98)',
              borderBottom: '1px solid rgba(220, 38, 38, 0.25)',
              backdropFilter: 'blur(20px)',
              padding: '1.5rem',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleLink(link.href)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '1.1rem',
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 600,
                  padding: '1rem 0.5rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar at top */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'rgba(255,255,255,0.05)',
        zIndex: 1001,
      }}>
        <motion.div style={{
          height: '100%',
          background: 'linear-gradient(90deg, #EF4444, #DC2626)',
          width: `${scrollProgress * 100}%`,
          transition: 'width 0.1s linear',
        }} />
      </div>

      {/* Mobile menu CSS */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .mobile-menu-btn { display: flex !important; align-items: center; }
        }
      `}</style>
    </>
  );
}
