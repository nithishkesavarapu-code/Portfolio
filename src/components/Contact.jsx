import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, MessageSquare, User, AtSign, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isHovered, setIsHovered] = useState(false);
  const [status, setStatus] = useState('idle');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Portfolio Message from ${formData.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative z-10 py-20 md:py-32 mb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          <div className="flex flex-col items-center text-center mb-16">
            <motion.h2 
              variants={fadeUp}
              className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 md:mb-6 py-4 leading-normal"
            >
              Let's Connect
            </motion.h2>
            <motion.p variants={fadeUp} className="text-gray-400 text-base md:text-lg max-w-2xl px-2 md:px-0">
              Currently seeking new opportunities to build highly impactful applications. Whether you have a question or just want to say hi, my inbox is always open!
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-stretch">
            
            <motion.div 
              variants={fadeUp}
              className="flex flex-col justify-between p-6 sm:p-8 md:p-10 rounded-3xl backdrop-blur-md bg-black/40 border border-white/10 shadow-2xl"
            >
              <div>
                <h3 className="text-3xl font-bold text-white mb-8">Get In Touch</h3>
                
                <div className="space-y-8">
                  <div className="flex items-center gap-5 group cursor-pointer">
                    <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/50 transition-colors duration-300">
                      <Mail className="text-cyan-400" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Email</p>
                      <a href="mailto:nithish.kesavarapu@gmail.com" className="text-base md:text-lg text-white font-medium group-hover:text-cyan-300 transition-colors break-all">
                        nithish.kesavarapu@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 group cursor-pointer">
                    <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-400/50 transition-colors duration-300">
                      <MapPin className="text-blue-400" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Location</p>
                      <p className="text-lg text-white font-medium group-hover:text-blue-300 transition-colors">
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-16">
                <p className="text-sm text-gray-400 mb-4">Connect on Socials</p>
                <div className="flex gap-4">
                  <a href="https://github.com/nithishkesavarapu-code" target="_blank" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 border border-white/5 hover:border-white/20">
                    <Github size={22} />
                  </a>
                  <a href="https://www.linkedin.com/in/nithish-reddy-kesavarapu/" target="_blank" className="p-3 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110 border border-white/5 hover:border-blue-400/30">
                    <Linkedin size={22} />
                  </a>
                  <a href="https://x.com/NithishK01" target="_blank" className="p-3 rounded-full bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110 border border-white/5 hover:border-cyan-400/30">
                    <Twitter size={22} />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="relative group">
              <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-20 transition-opacity duration-500 ${isHovered ? 'opacity-40' : ''}`}></div>
              
              <form 
                onSubmit={handleSubmit}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative p-8 md:p-10 rounded-3xl backdrop-blur-xl bg-black/60 border border-white/10 shadow-2xl flex flex-col gap-6 h-full"
              >
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300 ml-1">Your Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-500" />
                    </div>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="nithish" 
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-cyan-400/50 focus:bg-white/10 text-white placeholder-gray-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300 ml-1">Your Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <AtSign size={18} className="text-gray-500" />
                    </div>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="nithish@example.com" 
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-cyan-400/50 focus:bg-white/10 text-white placeholder-gray-500 transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 flex-grow">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300 ml-1">Your Message</label>
                  <div className="relative h-full">
                    <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none">
                      <MessageSquare size={18} className="text-gray-500" />
                    </div>
                    <textarea 
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="How can I help you?" 
                      className="w-full h-full min-h-[150px] pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-cyan-400/50 focus:bg-white/10 text-white placeholder-gray-500 transition-all duration-300 resize-none"
                    />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                  whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full mt-2 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    status === 'success' 
                      ? 'bg-emerald-500 text-white' 
                      : status === 'error'
                      ? 'bg-rose-500 text-white'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]'
                  } ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {status === 'loading' ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : status === 'success' ? (
                    <>
                      <div className="w-5 h-5 rounded-full bg-white text-emerald-500 flex items-center justify-center">✓</div>
                      <span>Message Sent!</span>
                    </>
                  ) : status === 'error' ? (
                    <span>Try Again</span>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
                
                {status === 'success' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-emerald-400 text-sm text-center font-medium"
                  >
                    Thank you! I'll get back to you soon.
                  </motion.p>
                )}
                
                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-rose-400 text-sm text-center font-medium"
                  >
                    Something went wrong. Please try again or email me directly.
                  </motion.p>
                )}
              </form>
            </motion.div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
