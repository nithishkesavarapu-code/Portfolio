import { motion } from "framer-motion";

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

export default function Hero() {
  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-between gap-16 mb-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
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

      <div className="max-w-xl z-10 flex flex-col justify-center">
        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 pb-2"
        >
          Nithish Reddy Kesavarapu
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-gray-400 mt-6 text-lg md:text-xl"
        >
          Building AI systems, automation tools, and full-stack apps.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-8 flex gap-5">
          <button className="border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-white">
            Resume
          </button>
          <button className="border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:scale-105 text-white">
            GitHub
          </button>
        </motion.div>
      </div>

      <motion.div
        variants={imageAnim}
        className="relative flex items-center justify-center z-10"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border border-white/20 backdrop-blur-xl bg-white/5 shadow-2xl flex items-center justify-center relative">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Nithish"
              alt="Nithish Reddy"
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110 relative z-10"
            />
          </div>

          <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-2xl -z-10"></div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}