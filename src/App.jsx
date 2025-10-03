import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MatrixBackground from "./components/MatrixBackground";

export default function App() {
  const [numbers, setNumbers] = useState(Array.from({ length: 14 }, (_, i) => i + 1));
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

    const spinInterval = setInterval(() => {
      if (spinCount < maxSpins) {
        const randomNum = Math.floor(Math.random() * 14) + 1;
        setDisplayedNumber(randomNum);
        spinCount++;
      } else {
        clearInterval(spinInterval);
        setDisplayedNumber(finalNumber);
        setIsSpinning(false);
      }
    }, 50 + (spinCount * 10));
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

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-green-400">
      <MatrixBackground />
      <h1 className="text-4xl mb-8 neon z-10">CTF Жеребьевка</h1>

      <div className="h-40 flex items-center justify-center z-10">
        <AnimatePresence mode="wait">
          {displayedNumber !== null && (
            <motion.div
              key={displayedNumber}
              initial={{ y: 50, opacity: 0, filter: "blur(5px)" }}
              animate={{
                y: 0,
                opacity: 1,
                filter: isSpinning ? "blur(3px)" : "blur(0px)",
                textShadow: "0 0 10px #39ff14, 0 0 20px #39ff14, 0 0 30px #39ff14",
              }}
              exit={{ y: -50, opacity: 0, filter: "blur(5px)" }}
              transition={{ duration: 0.2, ease: "linear" }}
              className="text-8xl font-mono neon-matrix glitch"
            >
              {typeof displayedNumber === "number" ? displayedNumber : displayedNumber}
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