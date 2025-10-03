import { motion, AnimatePresence } from "framer-motion";

export default function NumberDisplay({ number }) {
  return (
    <div className="h-40 flex items-center justify-center">
      <AnimatePresence mode="wait">
        {number !== null && (
          <motion.div
            key={number}
            initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
            animate={{ 
              scale: [0.5, 1.3, 1], 
              opacity: 1, 
              rotateY: 0,
              textShadow: "0px 0px 20px rgba(0,255,0,0.8), 0px 0px 40px rgba(0,255,0,0.6)"
            }}
            exit={{ scale: 0.5, opacity: 0, rotateY: -180 }}
            transition={{ duration: 0.8, ease: "easeOut", type: "spring" }}
            className="text-8xl font-extrabold text-green-400"
          >
            {number}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
