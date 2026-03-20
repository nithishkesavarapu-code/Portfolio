import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import profileImg from "../assets/Nithish_profile.png";
import { Settings } from "lucide-react";
import ContestManager from "./ContestManager";
import { ratingData, platforms } from "../data/contestRatings";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};



const imageAnim = {
  hidden: { opacity: 0, scale: 0.8, rotate: -8 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};


const MiniTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-md bg-black/80 border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-400 font-semibold mb-1">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-1.5 mb-0.5">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-gray-300">{p.dataKey}:</span>
          <span className="font-bold text-white">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function Hero({ data, onUpdate }) {
  const [showManager, setShowManager] = useState(false);

  return (
    <motion.section
      id="home"
      variants={container}
      initial="hidden"
      animate="show"
      className="relative min-h-screen flex items-center mb-8 md:mb-16 overflow-hidden w-full"
    >
      <div className="absolute inset-0 -z-10 w-full h-full">
        <motion.div
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-3xl"
        />
      </div>

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 flex flex-col gap-8 md:gap-12 xl:pr-12 pt-24 pb-12 md:py-20">

        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="max-w-xl z-10 flex flex-col justify-center text-center lg:text-left">
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 pb-2"
            >
              Nithish Reddy Kesavarapu
            </motion.h1>

            <motion.p variants={fadeUp} className="text-gray-400 mt-4 md:mt-6 text-base sm:text-lg md:text-xl">
              B.Tech CSE @ IIIT Ranchi · Backend &amp; AI Systems · Full-Stack Development
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 md:mt-8 flex gap-4 justify-center lg:justify-start">
              <a
                href="/Nithish_Reddy_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-white"
              >
                Resume
              </a>
              <a
                href="https://github.com/nithishkesavarapu-code"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-white"
              >
                GitHub
              </a>
              <a
                href="#contact"
                className="bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 px-6 py-3 rounded-full hover:from-emerald-500 hover:to-teal-600 hover:text-white transition-all duration-300 hover:scale-105 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={imageAnim}
            className="relative flex items-center justify-center z-10 shrink-0 lg:pr-10 xl:pr-20 w-full lg:w-auto"
          >
            <div className="relative p-6 pb-12">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-3 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #22d3ee 270deg, #3b82f6 360deg)",
                  }}
                />
                <div className="absolute -inset-3 rounded-full border-2 border-white/5" />

                <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border border-black/10 dark:border-white/20 backdrop-blur-xl bg-black/5 dark:bg-white/5 shadow-2xl flex items-center justify-center relative p-1">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-blue-500/10 dark:from-cyan-500/20 dark:to-blue-500/20" />
                  <img
                    src={profileImg}
                    alt="Nithish Reddy"
                    className="w-full h-full object-cover rounded-full transition-transform duration-500 hover:scale-110 relative z-10"
                  />
                </div>

                <div className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-500/30 blur-2xl -z-10" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/70 border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.25)] whitespace-nowrap z-20"
              >
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-green-300 tracking-wide">Open to Intern / Work</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUp}
          className="w-full rounded-2xl backdrop-blur-md bg-black/40 border border-white/10 px-4 pt-5 pb-3 shadow-xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-300">
                Contest Rating History
              </p>
              <button 
                onClick={() => setShowManager(true)}
                className="p-1 text-gray-500 hover:text-cyan-400 hover:bg-white/5 rounded transition-all cursor-pointer group"
                title="Manage Ratings"
              >
                <Settings size={14} className="group-hover:rotate-45 transition-transform" />
              </button>
            </div>
            <div className="flex gap-4">
              {platforms.map((p) => (
                <span key={p.key} className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-5 h-0.5 rounded-full" style={{ backgroundColor: p.color }} />
                  {p.key}
                </span>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={data} margin={{ top: 10, right: 12, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                tickFormatter={(str) => {
                  const date = new Date(str);
                  return date.toLocaleDateString('default', { month: 'short' });
                }}
                interval={3}
                tick={{ fill: "#4b5563", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#4b5563", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                domain={["auto", "auto"]}
                width={35}
                hide={false}
              />
              <Tooltip content={<MiniTooltip />} />
              {platforms.map((p) => (
                  <Line
                    key={p.key}
                    type="monotone"
                    dataKey={p.key}
                    stroke={p.color}
                    strokeWidth={2}
                    connectNulls={true}
                    dot={{ r: 2, fill: p.color, strokeWidth: 0 }}
                    activeDot={{ r: 4, fill: p.color, stroke: "#0a0a0a", strokeWidth: 2 }}
                    animationDuration={1000}
                  />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

      </div>
      <AnimatePresence>
        {showManager && (
          <ContestManager 
            data={data}
            onClose={() => setShowManager(false)} 
            onUpdate={onUpdate}
          />
        )}
      </AnimatePresence>

    </motion.section>
  );
}