import { AnimatePresence, motion } from 'framer-motion'
import { usePresentation } from '../../stores/presentation'
import { useKeyboardNav } from '../../hooks/useKeyboardNav'
import { ProgressBar } from './ProgressBar'
import { PresenterHUD } from './PresenterHUD'
import { Act1Problem } from '../acts/Act1Problem'
import { Act2Philosophy } from '../acts/Act2Philosophy'
import { Act3Architecture } from '../acts/Act3Architecture'
import { Act4Proof } from '../acts/Act4Proof'
import { Act5Interactive } from '../acts/Act5Interactive'

const acts: Record<number, React.FC> = {
  1: Act1Problem,
  2: Act2Philosophy,
  3: Act3Architecture,
  4: Act4Proof,
  5: Act5Interactive,
}

export function PresentationShell() {
  useKeyboardNav()
  const { currentAct } = usePresentation()
  const ActComponent = acts[currentAct]

  return (
    <div className="w-full h-full relative overflow-hidden grid-bg">
      {/* === ATMOSPHERIC LAYERS (portfolio-matched) === */}

      {/* Floating radial orbs — create depth */}
      <div className="bg-orb orb-lime" />
      <div className="bg-orb orb-cyan" />
      <div className="bg-orb orb-purple" />

      {/* Noise grain — adds tactile texture */}
      <div className="noise-overlay" />

      {/* Cinematic vignette — darkens edges */}
      <div className="vignette-overlay" />

      {/* Scan line — subtle horizontal sweep */}
      <div className="scan-line" />

      {/* === ACT CONTENT === */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentAct}
          className="w-full h-full relative z-[3]"
          initial={{ opacity: 0, filter: 'blur(8px)', scale: 0.98 }}
          animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
          exit={{ opacity: 0, filter: 'blur(4px)', scale: 1.01 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ActComponent />
        </motion.div>
      </AnimatePresence>

      {/* === HUD === */}
      <PresenterHUD />
      <ProgressBar />
    </div>
  )
}
