import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface ScoreGaugeProps {
  score: number
  label: string
  threshold?: number
  size?: number
  className?: string
  active?: boolean
}

export function ScoreGauge({ score, label, threshold, size = 160, className, active = true }: ScoreGaugeProps) {
  const radius = (size - 16) / 2
  const circumference = 2 * Math.PI * radius
  const progress = active ? (score / 10) * circumference : 0
  const passed = threshold ? score >= threshold : true
  const color = passed ? '#ccff00' : '#e11d48'

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1f1f1f"
          strokeWidth="6"
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
        {threshold && (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(204, 255, 0, 0.2)"
            strokeWidth="1"
            fill="none"
            strokeDasharray={`${(threshold / 10) * circumference} ${circumference}`}
            strokeLinecap="round"
          />
        )}
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="font-display text-3xl font-bold" style={{ color }}>
          {active ? score.toFixed(1) : '—'}
        </span>
        <span className="text-xs text-muted-foreground">/10</span>
      </div>
      <span className="text-sm text-muted-foreground font-body">{label}</span>
      {threshold && (
        <span className={cn('text-xs', passed ? 'text-lime' : 'text-red-500')}>
          {passed ? '✓' : '✗'} Gate: {threshold}
        </span>
      )}
    </div>
  )
}
