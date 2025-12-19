import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'

const roles = [
  {
    title: 'Student',
    description: 'View hall tickets, check seating, browse events, and access study resources.',
    icon: '🎓',
    route: '/student',
  },
  {
    title: 'Admin',
    description: 'Generate hall tickets, manage seating views, approve events, and oversee calendar.',
    icon: '👨‍💼',
    route: '/admin',
  },
  {
    title: 'Seating Manager',
    description: 'Allocate seating for exams across multiple rooms with intelligent distribution.',
    icon: '🪑',
    route: '/seating-manager',
  },
  {
    title: 'Club Coordinator',
    description: 'Submit club events, track approval status, and manage event details.',
    icon: '🎉',
    route: '/club-coordinator',
  },
]

function RoleCard({ role, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(role.route)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="glass-card ui-card-body cursor-pointer group relative"
    >
      <div className="text-5xl mb-4">{role.icon}</div>
      <h3 className="text-2xl font-semibold mb-3 text-white">{role.title}</h3>
      <p className="text-gray-300 leading-relaxed">{role.description}</p>
      <div 
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: '0 0 40px rgba(56, 189, 248, 0.3)',
        }}
      />
    </motion.div>
  )
}

export default function RoleEntry() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Access Your Dashboard
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Choose your role to access your personalized dashboard
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, index) => (
            <RoleCard key={index} role={role} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

