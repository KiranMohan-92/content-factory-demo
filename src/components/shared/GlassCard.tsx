import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../lib/utils'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  glow?: 'lime' | 'cyan' | 'none'
}

export function GlassCard({ children, className, glow = 'none', ...props }: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-card p-6',
        glow === 'lime' && 'glow-box-lime',
        glow === 'cyan' && 'glow-box-cyan',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}
