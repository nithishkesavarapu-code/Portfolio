import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ExternalLink, Trophy } from 'lucide-react';
import { codingProfiles } from '../data/codingProfiles';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

const CodingProfiles = () => {
  return (
    <section id="coding" className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-32 scroll-mt-24 overflow-visible">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="overflow-visible"
        >
          <div className="flex flex-col mb-16 mt-8 overflow-visible">
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <Terminal className="text-cyan-400" size={30} />
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 py-4 leading-normal">
                Coding Profiles
              </h2>
            </motion.div>
            <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-2xl text-left">
              A glimpse into my competitive programming journey and open-source contributions across various coding platforms.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {codingProfiles.map((profile, index) => (
              <motion.a
                key={index}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative flex flex-col p-5 sm:p-6 rounded-3xl backdrop-blur-md bg-gradient-to-br ${profile.color} bg-black/50 border border-white/10 ${profile.borderHover} ${profile.glow} transition-all duration-500 cursor-pointer shadow-xl overflow-hidden`}
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ backgroundColor: profile.badge }}
                />
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{profile.icon}</span>
                    <div>
                      <h3 className={`font-bold text-lg ${profile.accent}`}>{profile.platform}</h3>
                      <p className="text-gray-500 text-xs mt-0.5">{profile.username}</p>
                    </div>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-gray-600 group-hover:text-white transition-colors duration-300 shrink-0"
                  />
                </div>

                <div className="w-full h-px bg-white/10 mb-5" />

                <div className="space-y-4 relative z-10 flex-grow">
                  {profile.stats.map((stat, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{stat.label}</span>
                      <span className={`text-sm font-bold ${profile.accent}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className={`mt-6 pt-4 border-t border-white/10 relative z-10`}>
                  <span className={`text-xs font-medium ${profile.accent} group-hover:underline flex items-center gap-1`}>
                    View Profile <ExternalLink size={11} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfiles;
