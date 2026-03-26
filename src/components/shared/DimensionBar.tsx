import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface DimensionBarProps {
  name: string
  score: number
  weight: number
  delay?: number
  active?: boolean
  className?: string
}

export function DimensionBar({ name, score, weight, delay = 0, active = true, className }: DimensionBarProps) {
  const percentage = (score / 10) * 100
  const color = score >= 9.5 ? '#ccff00' : score >= 9.0 ? '#00b8b8' : score >= 8.0 ? '#f59e0b' : '#e11d48'

  return (
    <motion.div
      className={cn('flex flex-col gap-1.5', className)}
      initial={{ opacity: 0, x: -20 }}
      animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-body text-foreground">{name}</span>
        <div className="flex items-baseline gap-2">
          <span className="text-xs text-muted-foreground">{(weight * 100).toFixed(0)}%</span>
          <span className="text-base font-display font-bold tracking-tight tabular-nums" style={{ color }}>
            {score.toFixed(1)}
          </span>
        </div>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}cc, ${color})` }}
          initial={{ width: 0 }}
          animate={active ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
}
