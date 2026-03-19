import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";

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
            className="text-3xl md:text-5xl font-bold mb-8 md:mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 inline-block pb-2 leading-normal"
          >
            About Me
          </motion.h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            
            <motion.div variants={fadeUp} className="h-full space-y-5 text-gray-300 text-base md:text-lg leading-relaxed font-light bg-black/60 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-20 flex flex-col justify-center">
              <p>
                Hi, I'm <span className="text-white font-medium">Nithish Reddy Kesavarapu</span>. I'm a <span className="text-cyan-400 font-medium">Computer Science & Engineering</span> student with a focus on building robust digital experiences.
              </p>
              <p>
                I'm deeply passionate about Backend Engineering, AI/ML, and Full-Stack Development. My work spans building scalable REST APIs, training machine learning models, and creating real-time web applications that solve meaningful problems.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-6 h-full">
               
               <div className="grid grid-cols-2 gap-6">
                 <motion.div 
                   whileHover={{ y: -5, scale: 1.02 }} 
                   className="p-6 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10 hover:border-blue-500/50 hover:bg-black/70 transition-all duration-300 shadow-xl relative z-20"
                 >
                    <h3 className="text-3xl md:text-4xl font-bold text-blue-500 mb-2">300+</h3>
                    <p className="text-gray-400 text-sm md:text-base">DSA Problems Solved</p>
                 </motion.div>
                 
                 <motion.div 
                   whileHover={{ y: -5, scale: 1.02 }} 
                   className="p-6 rounded-2xl backdrop-blur-md bg-black/50 border border-white/10 hover:border-emerald-400/50 hover:bg-black/70 transition-all duration-300 shadow-xl relative z-20"
                 >
                    <h3 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2">3x</h3>
                    <p className="text-gray-400 text-sm md:text-base">Internship Experience</p>
                 </motion.div>
               </div>

               <div className="flex-1 bg-black/60 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl relative z-20 overflow-hidden group flex flex-col justify-center">
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-500" />
                  
                  <div className="flex flex-col sm:flex-row gap-6 items-start relative z-10">
                    <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform duration-300 shrink-0">
                      <GraduationCap size={28} />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white mb-1">Bachelor of Technology</h3>
                      <p className="text-cyan-400 font-medium text-base mb-3 leading-tight text-balance">Computer Science and Engineering</p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <MapPin size={14} className="text-gray-500" />
                          <span>Indian Institute of Information Technology, Ranchi</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                          <Calendar size={14} className="text-gray-500" />
                          <span>2023 — 2027</span>
                        </div>
                      </div>

                      <div className="mt-5 inline-block px-3 py-1.5 bg-white/5 rounded-lg border border-white/10 backdrop-blur-sm">
                        <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-0.5">Current CGPA</p>
                        <p className="text-lg font-bold text-white">8.19 / 10.0</p>
                      </div>
                    </div>
                  </div>
               </div>
               
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
