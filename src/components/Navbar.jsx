import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { House, User, CodeXml, Layers, Mail } from 'lucide-react';

const navItems = [
  { name: 'Home', icon: House, href: '#home' },
  { name: 'About', icon: User, href: '#about' },
  { name: 'Projects', icon: CodeXml, href: '#projects' },
  { name: 'Skills', icon: Layers, href: '#skills' },
  { name: 'Contact', icon: Mail, href: '#contact' },
];

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeItem = navItems.find(item => item.href === `#${entry.target.id}`);
          if (activeItem) {
            setActive(activeItem.name);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach((item) => {
      const targetId = item.href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-auto max-w-full flex justify-center"
    >
      <div className={`flex items-center shrink-0 p-1.5 sm:p-2 rounded-full transition-all duration-500 overflow-x-auto scrollbar-hide ${scrolled ? 'bg-black/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.15)]' : 'bg-white/5 backdrop-blur-lg border border-white/10'}`}>
        {navItems.map((item) => {
          const isActive = active === item.name;
          const isHovered = hoveredNode === item.name;
          const showLabel = isActive || isHovered;
          const Icon = item.icon;
          
          return (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setActive(item.name)}
              onMouseEnter={() => setHoveredNode(item.name)}
              onMouseLeave={() => setHoveredNode(null)}
              className="relative group px-3 py-2 sm:px-4 sm:py-3 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            >

              <div className={`absolute inset-0 rounded-full transition-colors ${isActive ? '' : 'group-hover:bg-white/5'}`} />
              
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div className="flex items-center gap-2 relative z-10 pointer-events-none">
                <Icon 
                  size={18} 
                  className={`transition-colors duration-300 sm:w-5 sm:h-5 ${isActive ? 'text-cyan-400 scale-110' : 'text-gray-400 group-hover:text-white'}`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                
                <AnimatePresence>
                  {showLabel && (
                    <motion.span
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "auto", opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className={`text-xs sm:text-sm font-medium whitespace-nowrap overflow-hidden ${isActive ? 'text-cyan-400' : 'text-white'}`}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Navbar;
