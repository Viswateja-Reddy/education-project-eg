import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

function Particle({ delay, x, y }) {
  const colors = ['#38bdf8', '#22c55e', '#facc15', '#ef4444', '#a855f7', '#f97316']
  const color = colors[Math.floor(Math.random() * colors.length)]
  const angle = Math.random() * Math.PI * 2
  const distance = 100 + Math.random() * 150
  const duration = 1 + Math.random() * 0.5

  return (
    <motion.div
      initial={{ opacity: 1, scale: 0, x: x, y: y }}
      animate={{
        opacity: [1, 1, 0],
        scale: [0, 1.2, 0.8],
        x: x + Math.cos(angle) * distance,
        y: y + Math.sin(angle) * distance,
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
      className="absolute w-2 h-2 rounded-full"
      style={{ backgroundColor: color }}
    />
  )
}

export default function Celebration({ onComplete }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const count = 30
    const newParticles = []
    const centerX = window.innerWidth / 2
    const centerY = window.innerHeight / 2

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        x: centerX + (Math.random() - 0.5) * 100,
        y: centerY + (Math.random() - 0.5) * 100,
        delay: Math.random() * 0.2,
      })
    }

    setParticles(newParticles)

    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 1500)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}
    </div>
  )
}

