import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const features = [
  {
    title: 'Role-Based Authentication',
    description: 'Secure access control with distinct dashboards for students, admins, seating managers, and club coordinators.',
    icon: '🔐',
    color: 'from-blue-500 to-cyan-400',
    delay: 0.1
  },
  {
    title: 'Hall Ticket Generation',
    description: 'QR-enabled hall tickets with instant PDF download. Seamless verification and exam management.',
    icon: '🎫',
    color: 'from-purple-500 to-pink-500',
    delay: 0.2
  },
  {
    title: 'Seating Allocation',
    description: 'Automated intelligent seating allocation across multiple exam rooms with real-time tracking.',
    icon: '🪑',
    color: 'from-green-500 to-emerald-400',
    delay: 0.3
  },
  {
    title: 'Club Events & Approval',
    description: 'Streamlined workflow for event submission, review, and approval with status tracking.',
    icon: '🎉',
    color: 'from-amber-500 to-yellow-400',
    delay: 0.4
  }
]

function FeatureCard({ feature, index, isActive, onHover }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.5,
          delay: feature.delay,
          ease: [0.16, 1, 0.3, 1] 
        }
      } : { opacity: 0, y: 30 }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className="h-full"
    >
      <div 
        className={`p-6 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg h-full transform transition-all duration-300 ${
          isActive ? 'ring-2 ring-white/20' : 'hover:ring-1 hover:ring-white/10'
        }`}
      >
        <div className="flex items-center mb-4">
          <div className="text-4xl mr-4">{feature.icon}</div>
          <h3 className="text-xl font-bold">{feature.title}</h3>
        </div>
        <p className="text-blue-50/90 leading-relaxed">{feature.description}</p>
      </div>
    </motion.div>
  )
}

export default function FeatureHighlights() {
  const [activeIndex, setActiveIndex] = useState(null)
  
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Our Integrated Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A seamless ecosystem connecting all aspects of academic management
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              feature={feature}
              index={index}
              isActive={activeIndex === index}
              onHover={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

