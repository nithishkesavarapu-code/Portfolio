import React from 'react'
import About from './components/About'
import Contact from './components/Contact'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Skills from './components/Skills'
import ScrollProgress from './components/ScrollProgress'
import NeuralBackground from './components/NeuralBackground'

const App = () => {
  return (
    <div className='text-white min-h-screen px-6 md:px-20 py-10 relative z-0'>
      <NeuralBackground />
      <ScrollProgress />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  )
}

export default App
