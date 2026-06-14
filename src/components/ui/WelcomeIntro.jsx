import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Settings, TrendingUp, Bot, CheckCircle } from 'lucide-react';

// Line structures containing text segments and reactive inline icons
const line1 = [
  { type: "text", text: "Welcome to " },
  { type: "text", text: "Autovate", color: "#1E88E5" }, // Blue
  { type: "icon", icon: Sparkles, color: "#1E88E5" }
];

const line2 = [
  { type: "text", text: "We " },
  { type: "text", text: "automate", color: "#4CAF50" }, // Green
  { type: "icon", icon: Settings, color: "#4CAF50" },
  { type: "text", text: " the boring stuff, so you can focus on " },
  { type: "text", text: "growth", color: "#FFA726" }, // Orange/Yellow
  { type: "icon", icon: TrendingUp, color: "#FFA726" }
];

const line3 = [
  { type: "text", text: "70+ AI-powered automation bots, ready to deploy in minutes" },
  { type: "icon", icon: Bot, color: "#B0B0B0" } // Gray/White
];

const line4 = [
  { type: "text", text: "Built to " },
  { type: "text", text: "solve problems", color: "#E53935" }, // Red
  { type: "text", text: ", fast" },
  { type: "icon", icon: CheckCircle, color: "#E53935" }
];

// Helper to slice and resolve display segments as typing progresses
function getDisplayedSegments(elements, visibleCharCount) {
  let charSum = 0;
  const rendered = [];

  elements.forEach((el) => {
    if (el.type === "text") {
      const remaining = visibleCharCount - charSum;
      if (remaining > 0) {
        const textToTake = el.text.slice(0, remaining);
        rendered.push({
          ...el,
          text: textToTake
        });
      }
      charSum += el.text.length;
    } else if (el.type === "icon") {
      if (visibleCharCount >= charSum) {
        rendered.push(el);
      }
    }
  });

  return rendered;
}

// Line renderer component
const IntroLine = ({ elements, visibleCharCount, isActive, isRendered }) => {
  if (!isRendered) return <div className="min-h-[2.5rem]" />;

  const displayed = getDisplayedSegments(elements, visibleCharCount);
  const totalTextLength = elements.reduce((sum, el) => sum + (el.type === "text" ? el.text.length : 0), 0);
  const isFinished = visibleCharCount >= totalTextLength;

  return (
    <div className="min-h-[2.5rem] flex items-center justify-center font-display text-sm sm:text-base md:text-lg lg:text-xl font-medium tracking-tight text-center max-w-2xl px-4 select-none">
      <div className="inline-block">
        {displayed.map((el, i) => {
          if (el.type === "text") {
            return (
              <span
                key={i}
                style={el.color ? { color: el.color } : {}}
                className={el.color ? "font-bold" : "text-zinc-400"}
              >
                {el.text}
              </span>
            );
          } else if (el.type === "icon") {
            const IconComponent = el.icon;
            return (
              <motion.span
                key={i}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 220, 
                  damping: 14,
                  mass: 0.8
                }}
                className="inline-flex items-center justify-center mx-1.5 align-middle"
                style={{ color: el.color || "#FFFFFF" }}
              >
                <IconComponent className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              </motion.span>
            );
          }
          return null;
        })}
        {isActive && !isFinished && (
          <span className="inline-block w-[2px] h-[1.1em] bg-[#1E88E5] ml-1.5 animate-pulse align-middle" />
        )}
      </div>
    </div>
  );
};

export default function WelcomeIntro({ onComplete }) {
  const [activeLine, setActiveLine] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
    }
  }, [onComplete]);

  // Main typing state machine
  useEffect(() => {
    const lines = [line1, line2, line3, line4];
    const totalLength = lines[activeLine].reduce((sum, el) => sum + (el.type === "text" ? el.text.length : 0), 0);

    if (charCount < totalLength) {
      const timer = setTimeout(() => {
        setCharCount((prev) => prev + 1);
      }, 35); // 35ms typing speed
      return () => clearTimeout(timer);
    } else {
      // Pause at the end of the line
      if (activeLine < 3) {
        const timer = setTimeout(() => {
          setActiveLine((prev) => prev + 1);
          setCharCount(0);
        }, 300); // 300ms pause between lines
        return () => clearTimeout(timer);
      } else {
        // Hold on the final typed state
        const timer = setTimeout(() => {
          onComplete();
        }, 900); // 900ms hold before fading out
        return () => clearTimeout(timer);
      }
    }
  }, [charCount, activeLine, onComplete]);

  const handleSkip = (e) => {
    e.stopPropagation();
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={handleSkip}
      className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center space-y-4 max-w-3xl w-full">
        {/* Render Line 1 */}
        <IntroLine
          elements={line1}
          visibleCharCount={activeLine === 0 ? charCount : line1.reduce((sum, el) => sum + (el.type === "text" ? el.text.length : 0), 0)}
          isActive={activeLine === 0}
          isRendered={activeLine >= 0}
        />

        {/* Render Line 2 */}
        <IntroLine
          elements={line2}
          visibleCharCount={activeLine === 1 ? charCount : line2.reduce((sum, el) => sum + (el.type === "text" ? el.text.length : 0), 0)}
          isActive={activeLine === 1}
          isRendered={activeLine >= 1}
        />

        {/* Render Line 3 */}
        <IntroLine
          elements={line3}
          visibleCharCount={activeLine === 2 ? charCount : line3.reduce((sum, el) => sum + (el.type === "text" ? el.text.length : 0), 0)}
          isActive={activeLine === 2}
          isRendered={activeLine >= 2}
        />

        {/* Render Line 4 */}
        <IntroLine
          elements={line4}
          visibleCharCount={activeLine === 3 ? charCount : line4.reduce((sum, el) => sum + (el.type === "text" ? el.text.length : 0), 0)}
          isActive={activeLine === 3}
          isRendered={activeLine >= 3}
        />
      </div>

      {/* skip instruction */}
      <button
        onClick={handleSkip}
        className="absolute bottom-12 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none py-2 px-4"
      >
        Click anywhere to skip
      </button>
    </motion.div>
  );
}
