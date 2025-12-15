"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 bg-grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-primary font-bold tracking-widest mb-4 uppercase text-sm md:text-base"
          >
            404 Error
          </motion.span>
          
          <h1 className="text-6xl md:text-9xl font-bold font-bruno mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 drop-shadow-2xl">
            PAGE NOT<br className="md:hidden" /> FOUND
          </h1>
          
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-primary mb-8 rounded-full"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg md:text-2xl max-w-2xl text-gray-400 leading-relaxed mb-10"
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link 
              href="/"
              className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/50"
            >
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
