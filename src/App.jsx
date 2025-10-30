import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MatrixBackground from "./components/MatrixBackground";

export default function App() {
  const [numbers, setNumbers] = useState(Array.from({ length: 15 }, (_, i) => i + 1));
  const [current, setCurrent] = useState(null);
  const [displayedNumber, setDisplayedNumber] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const handleDraw = () => {
    if (numbers.length === 0) {
      setCurrent("Все номера разобраны!");
      setDisplayedNumber("Все номера разобраны!");
      return;
    }
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const number = numbers[randomIndex];
    setNumbers(numbers.filter((n) => n !== number));
    setCurrent(number);
    startSpin(number);
  };

  const startSpin = (finalNumber) => {
    setIsSpinning(true);
    let spinCount = 0;
    const maxSpins = 20;
    let lastTime = 0;

    const spin = (timestamp) => {
      if (!lastTime) lastTime = timestamp;
      const delta = timestamp - lastTime;

      if (delta > 70) {
        const spinNumbers = numbers.length > 0 ? numbers : Array.from({ length: 15 }, (_, i) => i + 1);
        const randomNum = spinNumbers[Math.floor(Math.random() * spinNumbers.length)];
        setDisplayedNumber(randomNum);
        spinCount++;
        lastTime = timestamp;
      }

      if (spinCount < maxSpins) {
        requestAnimationFrame(spin);
      } else {
        setDisplayedNumber(finalNumber);
        setIsSpinning(false);
      }
    };

    requestAnimationFrame(spin);
  };

  const handleReset = () => {
    setNumbers(Array.from({ length: 15 }, (_, i) => i + 1));
    setCurrent(null);
    setDisplayedNumber(null);
    setIsSpinning(false);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Enter") {
        handleDraw();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [numbers]);

  useEffect(() => {
    if (displayedNumber !== null) {
      document.body.style.webkitTransform = "translateZ(0)";
      setTimeout(() => (document.body.style.webkitTransform = ""), 0);
    }
  }, [displayedNumber]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-green-400">
      <MatrixBackground />
      <h1 className="text-4xl mb-8 neon z-10">Жеребьевка</h1>

      <div className="h-40 flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          {displayedNumber !== null && (
            <motion.div
              key={displayedNumber}
              initial={{ y: 50, opacity: 0, scale: 0.9 }}
              animate={{
                y: 0,
                opacity: 1,
                scale: isSpinning ? 1.1 : 1,
              }}
              exit={{ y: -50, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-8xl font-mono neon-matrix glitch"
            >
              {displayedNumber}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-4 mt-8 z-10">
        <button
          onClick={handleDraw}
          disabled={numbers.length === 0 || isSpinning}
          className="px-6 py-3 text-lg border-2 border-green-400 rounded-md hover:bg-green-400 hover:text-black neon transition-all disabled:opacity-50"
        >
          Жеребьевка
        </button>
      </div>

      <div className="fixed bottom-4 right-4 z-10">
        <button
          onClick={handleReset}
          disabled={isSpinning}
          className="px-4 py-2 text-sm border-2 border-green-400 rounded-md hover:bg-green-400 hover:text-black neon transition-all disabled:opacity-50"
        >
          Сбросить
        </button>
      </div>
    </div>
  );
}
