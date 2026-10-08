import { useEffect, useRef, useState } from 'react';

// Rich confetti inspired by birthday animation effects
// Canvas-based — no external library — works everywhere

const COLORS = [
  '#DC2626', '#EF4444', '#B91C1C', '#991B1B',
  '#FFFFFF', '#F1F5F9', '#CBD5E1', '#94A3B8',
  '#EF4444', '#DC2626', '#2563EB',
];

const SHAPES = ['rect', 'circle', 'star', 'ribbon'];

function drawStar(ctx, x, y, radius, color, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
    const x2 = x + radius * Math.cos(angle);
    const y2 = y + radius * Math.sin(angle);
    if (i === 0) ctx.moveTo(x2, y2);
    else ctx.lineTo(x2, y2);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function createParticle(canvas, fromCenter = false) {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  let x, y, speedX, speedY;

  if (fromCenter) {
    // Burst from center
    x = canvas.width * 0.5 + (Math.random() - 0.5) * 200;
    y = canvas.height * 0.5 + (Math.random() - 0.5) * 100;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;
    speedX = Math.cos(angle) * speed;
    speedY = Math.sin(angle) * speed - 3;
  } else {
    // Rain from top
    x = Math.random() * canvas.width;
    y = Math.random() * -100;
    speedX = (Math.random() - 0.5) * 3;
    speedY = Math.random() * 3 + 2;
  }

  return {
    x, y, speedX, speedY,
    size: Math.random() * 10 + 4,
    color,
    shape,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10,
    opacity: 1,
    gravity: 0.08,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.05 + 0.02,
  };
}

export default function Confetti({ active }) {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const phaseRef = useRef('burst'); // 'burst' → 'rain'
  const lastBurstRef = useRef(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!active) {
      cancelAnimationFrame(rafRef.current);
      particlesRef.current = [];
      setReady(false);
      return;
    }

    setReady(true);
  }, [active]);

  useEffect(() => {
    if (!ready) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    // Initial big burst
    for (let i = 0; i < 80; i++) {
      particlesRef.current.push(createParticle(canvas, true));
    }

    const animate = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Phase: rain (after 1.5s)
      if (timestamp - lastBurstRef.current > 300) {
        const count = phaseRef.current === 'burst' ? 8 : 4;
        for (let i = 0; i < count; i++) {
          particlesRef.current.push(createParticle(canvas, false));
        }
        lastBurstRef.current = timestamp;
      }

      // Cap particles
      if (particlesRef.current.length > 400) {
        particlesRef.current = particlesRef.current.slice(-300);
      }

      particlesRef.current = particlesRef.current.filter((p) => {
        // Update
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.8;
        p.y += p.speedY;
        p.speedY += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007;

        if (p.opacity <= 0 || p.y > canvas.height + 30) return false;

        // Draw
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;

        switch (p.shape) {
          case 'rect':
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            break;
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'star':
            ctx.restore();
            drawStar(ctx, p.x, p.y, p.size / 2, p.color, Math.max(0, p.opacity));
            return true;
          case 'ribbon':
            ctx.beginPath();
            ctx.ellipse(0, 0, p.size / 2, p.size / 5, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
          default:
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        }

        ctx.restore();
        return true;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Stop generating new particles after 7s
    const stopTimer = setTimeout(() => {
      phaseRef.current = 'done';
      cancelAnimationFrame(rafRef.current);
    }, 8000);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(stopTimer);
      window.removeEventListener('resize', resize);
    };
  }, [ready]);

  if (!active && !ready) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9998,
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
