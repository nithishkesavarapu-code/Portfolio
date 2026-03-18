import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const About = () => {
  return (
    <section id="about" className="relative z-10 py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, amount: 0.2 }}
           variants={staggerContainer}
        >
          <motion.h2 
            variants={fadeUp}
            className="text-4xl md:text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 inline-block"
          >
            About Me
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <motion.div variants={fadeUp} className="space-y-6 text-gray-300 text-lg md:text-xl leading-relaxed font-light bg-black/60 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-20">
              <p>
                Hi, I'm <span className="text-white font-medium">Nithish Reddy Kesavarapu</span>. I am a passionate B.Tech Computer Science student deeply interested in Artificial Intelligence, Automation, and crafting robust Full-Stack applications.
              </p>
              <p>
                My journey in tech is driven by a curiosity to solve complex problems and build systems that make a real-world impact. Whether it's training machine learning models or designing engaging web interfaces, I thrive on turning ideas into scalable realities.
              </p>
              <p>
                When I'm not coding, you can find me exploring new technologies, analyzing the latest AI advancements, or continuously learning to stay ahead in the rapidly evolving software landscape.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6">
               
               <motion.div 
                 whileHover={{ y: -5, scale: 1.02 }} 
                 className="p-6 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10 hover:border-cyan-400/50 hover:bg-black/70 transition-all duration-300 shadow-xl relative z-20"
               >
                  <h3 className="text-4xl font-bold text-cyan-400 mb-2">3+</h3>
                  <p className="text-gray-400 text-sm md:text-base">Years of Coding</p>
               </motion.div>
               
               <motion.div 
                 whileHover={{ y: -5, scale: 1.02 }} 
                 className="p-6 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10 hover:border-blue-500/50 hover:bg-black/70 transition-all duration-300 shadow-xl relative z-20"
               >
                  <h3 className="text-4xl font-bold text-blue-500 mb-2">15+</h3>
                  <p className="text-gray-400 text-sm md:text-base">Projects Completed</p>
               </motion.div>
               
               <motion.div 
                 whileHover={{ y: -5, scale: 1.02 }} 
                 className="p-6 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10 hover:border-emerald-400/50 hover:bg-black/70 transition-all duration-300 shadow-xl relative z-20"
               >
                  <h3 className="text-4xl font-bold text-emerald-400 mb-2">AI</h3>
                  <p className="text-gray-400 text-sm md:text-base">Machine Learning Focus</p>
               </motion.div>
               
               <motion.div 
                 whileHover={{ y: -5, scale: 1.02 }} 
                 className="p-6 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10 hover:border-purple-400/50 hover:bg-black/70 transition-all duration-300 shadow-xl relative z-20"
               >
                  <h3 className="text-4xl font-bold text-purple-400 mb-2">Web</h3>
                  <p className="text-gray-400 text-sm md:text-base">Full-Stack Expertise</p>
               </motion.div>
               
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
