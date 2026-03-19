import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { House, User, CodeXml, Layers, Mail, Briefcase, TerminalSquare, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const navItems = [
  { name: 'Home', icon: House, href: '#home' },
  { name: 'About', icon: User, href: '#about' },
  { name: 'Experience', icon: Briefcase, href: '#experience' },
  { name: 'Projects', icon: CodeXml, href: '#projects' },
  { name: 'Skills', icon: Layers, href: '#skills' },
  { name: 'Coding', icon: TerminalSquare, href: '#coding' },
  { name: 'Contact', icon: Mail, href: '#contact' },
];

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [useCollapsed, setUseCollapsed] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const pillRef = useRef(null);
  const containerRef = useRef(null);
  const checkOverflow = useCallback(() => {
    const threshold = 1024;
    setUseCollapsed(window.innerWidth < threshold);
  }, []);

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [checkOverflow]);

  useEffect(() => {
    const updateActiveSection = () => {
      setScrolled(window.scrollY > 20);
      const scrollMid = window.scrollY + window.innerHeight * 0.4;
      let closestItem = navItems[0];
      let closestDist = Infinity;
      navItems.forEach((item) => {
        const el = document.getElementById(item.href.substring(1));
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const dist = Math.abs(top - scrollMid);
        if (top <= scrollMid + window.innerHeight * 0.15 && dist < closestDist) {
          closestDist = dist;
          closestItem = item;
        }
      });
      setActive(closestItem.name);
      if (window.location.hash !== closestItem.href) {
        history.replaceState(null, '', closestItem.href);
      }
    };
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection();
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, []);

  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener('scroll', close);
    window.addEventListener('resize', close);
    return () => {
      window.removeEventListener('scroll', close);
      window.removeEventListener('resize', close);
    };
  }, []);

  const navBg = scrolled
    ? isDark
      ? 'bg-black/70 backdrop-blur-2xl border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.15)]'
      : 'bg-white/80 backdrop-blur-2xl border border-black/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
    : isDark
      ? 'bg-white/5 backdrop-blur-lg border border-white/10'
      : 'bg-white/40 backdrop-blur-lg border border-black/10';

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex justify-center"
        style={{ maxWidth: 'calc(100vw - 32px)' }}
      >
        <div ref={containerRef} className={`flex items-center p-1.5 rounded-full transition-all duration-500 ${navBg}`}>

          {!useCollapsed && (
            <>
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
                    className="relative group px-3 py-2.5 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <div className={`absolute inset-0 rounded-full transition-colors ${isActive ? '' : isDark ? 'group-hover:bg-white/5' : 'group-hover:bg-black/5'}`} />
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <div className="flex items-center gap-2 relative z-10 pointer-events-none">
                      <Icon
                        size={18}
                        className={`transition-colors duration-300 ${isActive ? 'text-cyan-400' : isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-900'}`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />
                      <AnimatePresence>
                        {showLabel && (
                          <motion.span
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 'auto', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`text-sm font-medium whitespace-nowrap overflow-hidden ${isActive ? 'text-cyan-400' : isDark ? 'text-white' : 'text-gray-800'}`}
                          >
                            {item.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </a>
                );
              })}

              <div className={`w-px h-6 mx-2 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-full transition-all duration-300 ${isDark ? 'text-yellow-400 hover:bg-yellow-400/10' : 'text-slate-600 hover:bg-slate-900/10'}`}
                aria-label="Toggle theme"
              >
                <motion.div key={isDark ? 'moon' : 'sun'} initial={{ rotate: -90, scale: 0.5, opacity: 0 }} animate={{ rotate: 0, scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </motion.div>
              </button>
            </>
          )}

          {useCollapsed && (
            <div className="flex items-center gap-1 px-3 py-1.5">
              <span className={`text-sm font-semibold mr-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {active}
              </span>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all ${isDark ? 'text-yellow-400 hover:bg-yellow-400/10' : 'text-slate-600 hover:bg-slate-900/10'}`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full transition-all ${isDark ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-black/5'}`}
                aria-label="Open menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen
                    ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X size={22} /></motion.span>
                    : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu size={22} /></motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>
          )}
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && useCollapsed && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`fixed inset-0 z-40 flex flex-col pt-28 px-8 pb-10 backdrop-blur-3xl ${isDark ? 'bg-black/70' : 'bg-white/75'}`}
          >
            <div className="flex flex-col gap-3 flex-grow justify-center">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = active === item.name;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => { setActive(item.name); setIsOpen(false); }}
                    className={`flex items-center gap-5 px-5 py-4 rounded-2xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30'
                        : isDark ? 'hover:bg-white/5' : 'hover:bg-black/5'
                    }`}
                  >
                    <Icon size={22} className={isActive ? 'text-cyan-400' : isDark ? 'text-gray-400' : 'text-gray-500'} />
                    <span className={`text-lg font-medium ${isActive ? 'text-cyan-400' : isDark ? 'text-white' : 'text-gray-800'}`}>
                      {item.name}
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
