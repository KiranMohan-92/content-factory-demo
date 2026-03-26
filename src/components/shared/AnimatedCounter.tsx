import { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  decimals?: number
  className?: string
  active?: boolean
  suffix?: string
}

export function AnimatedCounter({ from, to, duration = 2000, decimals = 1, className, active = true, suffix = '' }: AnimatedCounterProps) {
  const [value, setValue] = useState(from)

  useEffect(() => {
    if (!active) { setValue(from); return }
    const start = performance.now()
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(from + (to - from) * eased)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [from, to, duration, active])

  const color = value >= 9.3 ? 'score-excellent' : value >= 8.0 ? 'score-good' : value >= 7.0 ? 'score-warning' : 'score-fail'

  return (
    <span className={cn(color, 'font-display font-bold tabular-nums', className)}>
      {value.toFixed(decimals)}{suffix}
    </span>
  )
}
