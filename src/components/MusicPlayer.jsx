import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Music2, X } from 'lucide-react';

export default function MusicPlayer({ audioSrc = '/audio/birthday.mp3' }) {
  const [exists, setExists] = useState(null);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Check if audio file exists
    fetch(audioSrc, { method: 'HEAD' })
      .then((res) => setExists(res.ok))
      .catch(() => setExists(false));
  }, [audioSrc]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setPlaying(!playing);
  };

  // Don't render if audio file doesn't exist
  if (exists === false || exists === null) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="none"
        aria-label="Birthday music"
      />
      <AnimatePresence>
        <motion.button
          className="music-btn"
          onClick={toggle}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={playing ? 'Pause music' : 'Play music'}
          title={playing ? 'Pause music' : '🎵 Play the memories soundtrack'}
        >
          {playing ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Music size={16} />
              </motion.div>
              <span>Playing</span>
              <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    style={{
                      width: '2px',
                      background: '#3B82F6',
                      borderRadius: '1px',
                    }}
                    animate={{ height: [4, 12, 4] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <Music2 size={16} />
              <span>🎵 Soundtrack</span>
            </>
          )}
        </motion.button>
      </AnimatePresence>
    </>
  );
}
