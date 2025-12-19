import { motion, AnimatePresence } from 'framer-motion'
import { useToast } from '../contexts/ToastContext'
import { useEffect } from 'react'

function Toast({ id, message, type }) {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id)
    }, 3000)
    return () => clearTimeout(timer)
  }, [id, removeToast])

  const colors = {
    success: {
      bg: 'rgba(34, 197, 94, 0.15)',
      border: 'rgba(34, 197, 94, 0.5)',
      text: '#22c55e',
      icon: '✓',
    },
    error: {
      bg: 'rgba(239, 68, 68, 0.15)',
      border: 'rgba(239, 68, 68, 0.5)',
      text: '#ef4444',
      icon: '✕',
    },
    warning: {
      bg: 'rgba(234, 179, 8, 0.15)',
      border: 'rgba(234, 179, 8, 0.5)',
      text: '#eab308',
      icon: '⚠',
    },
  }

  const style = colors[type] || colors.success

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm shadow-lg min-w-[300px] max-w-md"
      style={{
        background: style.bg,
        borderColor: style.border,
        color: style.text,
      }}
    >
      <span className="text-xl font-bold">{style.icon}</span>
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={() => removeToast(id)}
        className="text-lg leading-none opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close"
      >
        ×
      </button>
    </motion.div>
  )
}

export default function ToastContainer() {
  const { toasts } = useToast()

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast {...toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

