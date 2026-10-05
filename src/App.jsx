import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import AmbientBackground from './components/AmbientBackground'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import { profile } from './data/portfolio'

function App() {
  // Blob colors for the ambient background; null means its default palette.
  const [tint, setTint] = useState(null)

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen relative overflow-x-clip">
        <AmbientBackground colors={tint ?? undefined} />

        <div className="relative z-10">
          <NavBar />
          <Hero />
          <main className="px-[var(--gutter)] pt-4 flex flex-col gap-24">
            <Projects onTint={setTint} />
            <Experience />
            <Skills />
            <Credentials />
            <Contact />
          </main>
          <footer className="px-[var(--gutter)] pt-16 pb-12 text-sm text-white/40">
            © 2026 {profile.name} · {profile.location}
          </footer>
        </div>
      </div>
    </MotionConfig>
  )
}

export default App
