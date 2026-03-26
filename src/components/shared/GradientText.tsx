import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span' | 'p'
  delay?: number
}

export function GradientText({ children, className, as: Tag = 'span', delay = 0 }: GradientTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <Tag className={cn('gradient-text', className)}>{children}</Tag>
    </motion.div>
  )
}
