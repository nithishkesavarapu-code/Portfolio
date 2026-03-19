import React from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ScrollProgress from './components/ScrollProgress'
import NeuralBackground from './components/NeuralBackground'
import Navbar from './components/Navbar'
import Experience from './components/Experience'
import CodingProfiles from './components/CodingProfiles'

const App = () => {
  return (
    <div className='min-h-screen px-3 sm:px-6 md:px-16 lg:px-20 py-10 relative z-0 transition-colors duration-400'
      style={{ color: 'var(--text-primary)' }}
    >
      <NeuralBackground />
      <Navbar />
      <ScrollProgress />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <CodingProfiles />
      <Contact />
    </div>
  )
}

export default App
