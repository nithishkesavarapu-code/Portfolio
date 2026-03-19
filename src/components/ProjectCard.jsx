import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';

const ProjectCard = ({ project, variants }) => {
  return (
    <motion.div 
      variants={variants}
      whileHover={{ y: -8 }}
      className={`group relative p-6 sm:p-8 rounded-3xl backdrop-blur-md bg-black/50 border border-white/10 overflow-hidden transition-all duration-500 hover:border-cyan-400/40 hover:glass-glow shadow-2xl flex flex-col h-full ${project.featured ? 'md:col-span-2 md:flex-row gap-6 md:gap-8 items-start md:items-center bg-gradient-to-br from-black/60 to-blue-900/20' : ''}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-colors duration-500 pointer-events-none" />

      {project.featured && (
        <div className="w-full md:w-2/5 h-36 sm:h-48 md:h-full rounded-2xl bg-white/5 border border-white/10 overflow-hidden relative shrink-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/30 blur-xl" />
          <Code2 className="text-white/20 w-32 h-32 relative z-10" />
        </div>
      )}

      <div className="flex flex-col flex-grow relative z-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex gap-3">
            <a href={project.github} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5 hover:border-white/20">
              <Github size={20} />
            </a>
            <a href={project.live} target="_blank" className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-cyan-400 transition-colors border border-white/5 hover:border-cyan-400/30">
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
        
        <p className="text-gray-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8 flex-grow">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((tag, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1 text-xs sm:text-sm font-medium rounded-full bg-white/5 border border-white/10 text-cyan-200/80 group-hover:text-cyan-400 group-hover:border-cyan-400/30 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
