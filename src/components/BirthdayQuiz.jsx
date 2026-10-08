import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions } from '../data/quiz.js';

function getRating(score, total) {
  const pct = score / total;
  if (pct === 1) return { label: 'AASHIK EXPERT', emoji: '🏆', color: '#DC2626' };
  if (pct >= 0.8) return { label: 'AASHIK SUPERFAN', emoji: '⭐', color: '#EF4444' };
  if (pct >= 0.6) return { label: 'AASHIK FOLLOWER', emoji: '😊', color: '#10B981' };
  if (pct >= 0.4) return { label: 'GETTING THERE', emoji: '😅', color: '#F59E0B' };
  return { label: 'TAKE A SEAT', emoji: '😂', color: '#991B1B' };
}

export default function BirthdayQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const question = quizQuestions[currentQ];
  const rating = getRating(score, quizQuestions.length);

  const handleSelect = (optionIndex) => {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === question.correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
  };

  return (
    <section
      id="quiz"
      style={{
        padding: '6rem 1.5rem',
        background: '#050507',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div className="container-sm">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            🧠 Interactive
          </span>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 900,
            letterSpacing: '-0.03em',
            color: 'white',
            marginBottom: '0.75rem',
          }}>
            HOW WELL DO YOU KNOW AASHIK?
          </h2>
          <div className="divider" />
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontStyle: 'italic',
            fontFamily: 'Playfair Display, serif',
            fontSize: '1rem',
          }}>
            "{quizQuestions.length} questions. No cheating."
          </p>
        </motion.div>

        {/* Quiz card */}
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              }}
            >
              {/* Progress */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.05em',
                }}>
                  <span>Question {currentQ + 1} of {quizQuestions.length}</span>
                  <span>{score} correct</span>
                </div>
                <div style={{
                  height: '3px',
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: '100px',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #EF4444, #DC2626)',
                      borderRadius: '100px',
                    }}
                    initial={{ width: `${(currentQ / quizQuestions.length) * 100}%` }}
                    animate={{ width: `${((currentQ + 1) / quizQuestions.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>

              {/* Question */}
              <h3 style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                fontWeight: 700,
                color: 'white',
                marginBottom: '2rem',
                lineHeight: 1.4,
              }}>
                {question.question}
              </h3>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {question.options.map((option, i) => {
                  let optClass = 'quiz-option';
                  if (answered) {
                    if (i === question.correct) optClass += ' correct';
                    else if (i === selected) optClass += ' wrong';
                  }
                  return (
                    <motion.button
                      key={i}
                      className={optClass}
                      onClick={() => handleSelect(i)}
                      whileHover={!answered ? { x: 4 } : {}}
                      whileTap={!answered ? { scale: 0.99 } : {}}
                    >
                      <span style={{
                        display: 'inline-flex',
                        width: '28px',
                        height: '28px',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'rgba(255,255,255,0.06)',
                        borderRadius: '6px',
                        marginRight: '0.75rem',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        flexShrink: 0,
                      }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      {option}
                    </motion.button>
                  );
                })}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {answered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      padding: '1rem 1.25rem',
                      background: selected === question.correct
                        ? 'rgba(16, 185, 129, 0.1)'
                        : 'rgba(239, 68, 68, 0.1)',
                      border: `1px solid ${selected === question.correct ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                      borderRadius: '12px',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '1.1rem' }}>
                        {selected === question.correct ? '✅' : '❌'}
                      </span>
                      <div>
                        <div style={{
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          color: selected === question.correct ? '#10B981' : '#EF4444',
                          marginBottom: '0.25rem',
                        }}>
                          {selected === question.correct ? 'Correct!' : 'Not quite!'}
                        </div>
                        <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>
                          {question.explanation}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next button */}
              {answered && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="btn btn-primary"
                  onClick={handleNext}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {currentQ < quizQuestions.length - 1 ? 'Next Question →' : 'See My Score 🎯'}
                </motion.button>
              )}
            </motion.div>
          ) : (
            /* Results */
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: 'clamp(2rem, 5vw, 3.5rem)',
                textAlign: 'center',
              }}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
                style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
              >
                {rating.emoji}
              </motion.div>

              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: rating.color,
                marginBottom: '0.5rem',
              }}>
                {rating.label}
              </div>

              <div style={{
                fontSize: 'clamp(3rem, 10vw, 6rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                color: 'white',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                {score}
                <span style={{ fontSize: '40%', color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>
                  /{quizQuestions.length}
                </span>
              </div>

              <p style={{
                color: 'rgba(255,255,255,0.5)',
                fontStyle: 'italic',
                marginBottom: '2.5rem',
                fontSize: '1rem',
              }}>
                {score === quizQuestions.length
                  ? 'Perfect score! You truly know Aashik. 🎉'
                  : score >= quizQuestions.length * 0.7
                  ? 'Impressive! Aashik would be proud.'
                  : 'Not bad! Maybe spend more time with Aashik. 😄'}
              </p>

              <button className="btn btn-ghost" onClick={handleRestart}>
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
