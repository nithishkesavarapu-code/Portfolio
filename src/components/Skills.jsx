import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, Database, Wrench, Brain, Users } from 'lucide-react';
import { skillCategories as skillData } from '../data/skills';

const iconMap = {
  "Languages": Code2,
  "Web Technologies": Globe,
  "Database & Infrastructure": Database,
  "Tools & Concepts": Wrench,
  "AI & Machine Learning": Brain,
  "Soft Skills": Users,
};

const skillCategories = skillData.map(cat => ({
  ...cat,
  icon: iconMap[cat.title]
}));


const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const itemPop = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: "spring", stiffness: 200, damping: 20 }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="relative z-10 py-20 md:py-32 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <div className="flex flex-col mb-16">
            <motion.h2 
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 mb-6 py-4 leading-normal"
            >
              Technical Arsenal
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl text-left">
              A comprehensive toolkit of technologies I utilize to bridge the gap between complex artificial intelligence algorithms and intuitive user interfaces.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              
              return (
                <motion.div 
                  key={index}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  className={`group p-6 sm:p-8 rounded-3xl backdrop-blur-md bg-black/40 border border-white/10 transition-all duration-500 flex flex-col h-full ${category.bgGlow}`}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className={category.color} size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-gray-200 transition-colors">
                      {category.title}
                    </h3>
                  </div>
                  
                  <motion.div 
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex flex-wrap gap-3 mt-auto"
                  >
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        variants={itemPop}
                        whileHover={{ scale: 1.05, y: -2 }}
                        className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-all cursor-default shadow-lg`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
