import { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'

interface TypewriterTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
  onComplete?: () => void
  active?: boolean
}

export function TypewriterText({ text, className, speed = 40, delay = 0, onComplete, active = true }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!active) { setDisplayed(''); setStarted(false); return }
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay, active])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      onComplete?.()
      return
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(timer)
  }, [displayed, started, text, speed, onComplete])

  return (
    <span className={cn('font-body', className)}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-lime ml-0.5 animate-pulse" />
      )}
    </span>
  )
}
