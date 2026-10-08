import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const milestones = [
  { label: 'Baby',   icon: '👶', pct: 4  },
  { label: 'School', icon: '🏫', pct: 22 },
  { label: 'Family', icon: '❤️', pct: 40 },
  { label: 'Cars',   icon: '🚗', pct: 58 },
  { label: '11 Yrs', icon: '⭐', pct: 76 },
  { label: 'Year 12',icon: '🏁', pct: 94 },
];

// Premium BMW-style side profile SVG in Obsidian Black + Crimson Red M-Performance Styling
function BMWSideProfile({ scale = 1 }) {
  return (
    <svg
      width={Math.round(100 * scale)}
      height={Math.round(42 * scale)}
      viewBox="0 0 100 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        filter: `
          drop-shadow(0 0 14px rgba(220,38,38,0.65))
          drop-shadow(0 4px 10px rgba(0,0,0,0.95))
        `,
      }}
      aria-hidden="true"
    >
      {/* Road shadow */}
      <ellipse cx="50" cy="40" rx="44" ry="3" fill="rgba(220,38,38,0.15)" />

      {/* Car underbody */}
      <path d="M12 30 L88 30 L88 34 L12 34 Z" fill="#040406" />

      {/* Main body — Obsidian Black */}
      <path
        d="M10 30 L10 22 L22 14 L55 11 L76 14 L90 20 L92 30 Z"
        fill="#121217"
        stroke="rgba(220,38,38,0.5)"
        strokeWidth="0.8"
      />

      {/* Hood slope */}
      <path
        d="M76 14 L88 20 L90 24 L76 24 Z"
        fill="#181820"
        stroke="rgba(220,38,38,0.3)"
        strokeWidth="0.5"
      />

      {/* Roof / cabin */}
      <path
        d="M24 22 L30 13 L58 11 L68 14 L70 22 Z"
        fill="#08080C"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.5"
      />

      {/* Windshield */}
      <path
        d="M32 21 L37 13 L56 11.5 L62 21 Z"
        fill="rgba(200,210,230,0.15)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.5"
      />

      {/* Rear window */}
      <path
        d="M24 21 L27 14 L33 13 L31 21 Z"
        fill="rgba(200,210,230,0.1)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.5"
      />

      {/* BMW kidney grille area with Crimson accent */}
      <rect x="85" y="20" width="5" height="6" rx="1" fill="rgba(220,38,38,0.2)" stroke="#DC2626" strokeWidth="0.6" />
      <line x1="87.5" y1="20" x2="87.5" y2="26" stroke="#DC2626" strokeWidth="0.6" />

      {/* Headlight LED Xenon (subtle ice blue/white) */}
      <ellipse cx="89" cy="24" rx="4" ry="2.5" fill="rgba(220,240,255,0.9)" />
      <ellipse cx="89" cy="24" rx="7" ry="4" fill="rgba(59,130,246,0.2)" />

      {/* Headlight beam */}
      <path d="M93 23 L100 21 L100 27 L93 25 Z" fill="rgba(220,240,255,0.12)" />

      {/* Tail light — Deep Crimson Red */}
      <rect x="10" y="21" width="4" height="5" rx="1" fill="#DC2626" />
      <ellipse cx="10" cy="23.5" rx="6" ry="3.5" fill="rgba(220,38,38,0.5)" />

      {/* Body M-Performance Crimson accent line */}
      <path
        d="M12 24 Q50 22 88 24"
        stroke="#DC2626"
        strokeWidth="0.8"
        fill="none"
      />

      {/* Door lines */}
      <line x1="46" y1="14" x2="44" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
      <line x1="62" y1="16" x2="61" y2="30" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />

      {/* Side mirror */}
      <path d="M70 18 L74 17 L74 20 L70 20 Z" fill="#181820" stroke="rgba(220,38,38,0.4)" strokeWidth="0.4" />

      {/* Front wheel with Red M-caliper */}
      <g>
        <circle cx="74" cy="32" r="8.5" fill="#050507" stroke="rgba(148,163,184,0.7)" strokeWidth="1.2" />
        <circle cx="74" cy="32" r="6" fill="none" stroke="rgba(220,38,38,0.5)" strokeWidth="0.8" />
        <circle cx="74" cy="32" r="3.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <circle cx="74" cy="32" r="1.5" fill="#DC2626" />
        {/* Spokes */}
        {[0,60,120,180,240,300].map(deg => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={74 + 2 * Math.cos(rad)}
              y1={32 + 2 * Math.sin(rad)}
              x2={74 + 5.5 * Math.cos(rad)}
              y2={32 + 5.5 * Math.sin(rad)}
              stroke="rgba(148,163,184,0.6)"
              strokeWidth="0.6"
            />
          );
        })}
      </g>

      {/* Rear wheel with Red M-caliper */}
      <g>
        <circle cx="26" cy="32" r="8.5" fill="#050507" stroke="rgba(148,163,184,0.7)" strokeWidth="1.2" />
        <circle cx="26" cy="32" r="6" fill="none" stroke="rgba(220,38,38,0.5)" strokeWidth="0.8" />
        <circle cx="26" cy="32" r="3.5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
        <circle cx="26" cy="32" r="1.5" fill="#DC2626" />
        {[0,60,120,180,240,300].map(deg => {
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={26 + 2 * Math.cos(rad)}
              y1={32 + 2 * Math.sin(rad)}
              x2={26 + 5.5 * Math.cos(rad)}
              y2={32 + 5.5 * Math.sin(rad)}
              stroke="rgba(148,163,184,0.6)"
              strokeWidth="0.6"
            />
          );
        })}
      </g>

      {/* Speed blur lines behind in Crimson Red */}
      <line x1="0" y1="23" x2="8" y2="23" stroke="rgba(220,38,38,0.7)" strokeWidth="0.8" />
      <line x1="0" y1="25" x2="5" y2="25" stroke="rgba(220,38,38,0.5)" strokeWidth="0.5" />
      <line x1="0" y1="27" x2="6" y2="27" stroke="rgba(220,38,38,0.35)" strokeWidth="0.4" />
    </svg>
  );
}

export default function CarJourney() {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Smooth spring — feels like a real car accelerating/decelerating
  const rawX = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 78 : 84]);
  const carX = useSpring(rawX, { stiffness: 35, damping: 18, mass: 0.8 });

  // Road animation offset (makes road look like it's moving)
  const roadX = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const roadH = isMobile ? 58 : 72;
  const carScale = isMobile ? 0.65 : 0.88;
  const carBottom = isMobile ? 20 : 28;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: roadH + 12,
        pointerEvents: 'none',
      }}
    >
      {/* Road bed */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: roadH,
        background: 'linear-gradient(180deg, #0A0A0E 0%, #040406 100%)',
        borderTop: '1px solid rgba(220,38,38,0.2)',
        overflow: 'hidden',
      }}>
        {/* Moving dashed center line */}
        <motion.div
          style={{
            position: 'absolute',
            top: '42%',
            height: '2px',
            width: '200%',
            left: 0,
            x: roadX,
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.15) 0px,
              rgba(255,255,255,0.15) 35px,
              transparent 35px,
              transparent 70px
            )`,
          }}
        />

        {/* Subtle second lane line */}
        <div style={{
          position: 'absolute',
          top: '65%',
          height: '1px',
          left: 0,
          right: 0,
          background: 'rgba(255,255,255,0.03)',
        }} />

        {/* Road edge glow in Crimson Red */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.35) 30%, rgba(220,38,38,0.35) 70%, transparent 100%)',
        }} />
      </div>

      {/* Milestone markers */}
      {milestones.map((m, i) => (
        <div
          key={m.label}
          style={{
            position: 'absolute',
            bottom: roadH + 2,
            left: `${m.pct}%`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            opacity: 0.65,
          }}
        >
          <div style={{
            fontSize: isMobile ? '0.5rem' : '0.58rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
            whiteSpace: 'nowrap',
            fontFamily: 'Outfit, sans-serif',
          }}>
            {m.label}
          </div>
          <div style={{
            width: '2px',
            height: '6px',
            background: 'rgba(220,38,38,0.4)',
            borderRadius: '1px',
          }} />
        </div>
      ))}

      {/* The BMW Car — scroll-driven */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: carBottom,
          left: 0,
          x: `${carX.get ? carX : 0}%`,
          willChange: 'transform',
        }}
      >
        {/* Ground shadow / crimson taillight glow under car */}
        <div style={{
          position: 'absolute',
          bottom: -6,
          left: '10%',
          right: '10%',
          height: '8px',
          background: 'radial-gradient(ellipse, rgba(220,38,38,0.4) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        <BMWSideProfile scale={carScale} />
      </motion.div>

      {/* Finish flag */}
      <div style={{
        position: 'absolute',
        bottom: roadH,
        right: '2%',
        fontSize: isMobile ? '1rem' : '1.3rem',
        opacity: 0.5,
      }}>
        🏁
      </div>
    </div>
  );
}
