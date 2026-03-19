import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';
import ProjectCard from './ProjectCard';

import { projects } from '../data/projects';

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const Projects = () => {
  return (
    <section id="projects" className="relative z-10 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <div className="flex items-center gap-4 mb-16">
            <motion.div variants={fadeUp} className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
              <Code2 className="text-cyan-400" size={32} />
            </motion.div>
            <motion.h2 
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 py-4 leading-normal"
            >
              Featured Work
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} variants={fadeUp} />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
