import { useEffect } from 'react'
import { usePresentation } from '../stores/presentation'

export function useKeyboardNav() {
  const { nextStep, prevStep, nextAct, prevAct, goToAct } = usePresentation()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault()
          nextStep()
          break
        case 'ArrowLeft':
          e.preventDefault()
          prevStep()
          break
        case 'ArrowDown':
          e.preventDefault()
          nextAct()
          break
        case 'ArrowUp':
          e.preventDefault()
          prevAct()
          break
        case '1': case '2': case '3': case '4': case '5':
          goToAct(parseInt(e.key))
          break
        case 'f':
        case 'F':
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
          } else {
            document.exitFullscreen()
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextStep, prevStep, nextAct, prevAct, goToAct])
}
