import { motion, AnimatePresence } from 'framer-motion'
import { usePresentation } from '../../stores/presentation'
import { SceneContainer } from '../three/SceneContainer'
import { GlowSphere } from '../three/GlowSphere'
import { ConnectionBeam } from '../three/ConnectionBeam'
import { ParticleField } from '../three/ParticleField'
import { GridFloor } from '../three/GridFloor'
import { GlassCard } from '../shared/GlassCard'

export function Act1Problem() {
  const step = usePresentation(s => s.currentStep)
  // Shift 3D left when cards appear
  const groupX = step >= 1 ? -2.5 : 0

  return (
    <div className="w-full h-full relative">
      <SceneContainer>
        <ParticleField count={80} color="#e11d48" />
        <GridFloor />
        <group position={[groupX, -0.5, 0]}>
          {step >= 1 && (
            <>
              <GlowSphere position={[-2, 1.2, -1]} color="#f59e0b" label="Books & Gurus" radius={0.3} active pulsate />
              <GlowSphere position={[0, -1.2, -1.5]} color="#e11d48" label="AI-Generated" radius={0.4} active pulsate />
              <GlowSphere position={[1.8, 1, -1]} color="#9933ff" label="Social Media" radius={0.28} active pulsate />
            </>
          )}
          {step >= 2 && (
            <>
              <ConnectionBeam start={[-2, 1.2, -1]} end={[0, -1.2, -1.5]} color="#e11d48" active />
              <ConnectionBeam start={[1.8, 1, -1]} end={[0, -1.2, -1.5]} color="#e11d48" active />
              <ConnectionBeam start={[-2, 1.2, -1]} end={[1.8, 1, -1]} color="#f59e0b" active />
            </>
          )}
          {step >= 3 && (
            <GlowSphere position={[0.3, 0.3, 0.5]} color="#ccff00" label="Hard-to-Vary Filter" sublabel="David Deutsch" radius={0.45} active pulsate />
          )}
        </group>
      </SceneContainer>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <motion.div
          className="pt-[6vh] md:pt-[7vh] px-6 md:px-12 text-center"
          initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-editorial text-xl md:text-2xl text-muted-foreground italic mb-3">Act I</h2>
          <h1 className="font-display tracking-tight text-5xl md:text-7xl lg:text-8xl font-extrabold text-metallic">
            The Explanation Test
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body mt-4">
            Most explanations don't survive it.
          </p>
        </motion.div>

        {/* RIGHT side cards — one at a time */}
        <div className="absolute right-6 md:right-[14vw] top-[32vh] md:top-[30vh] max-w-[88vw] md:max-w-[420px] pointer-events-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="crisis"
                initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard glow="lime" className="px-7 py-6">
                  <h3 className="font-display tracking-tight text-xl md:text-2xl font-bold text-lime glow-lime mb-4">The Crisis</h3>
                  <div className="space-y-3 font-body text-base md:text-lg text-[#EDF1FF]/90">
                    <p>→ AI content: convincing but unverifiable</p>
                    <p>→ Books & gurus: unfalsifiable advice</p>
                    <p>→ Old heuristics: broken at scale</p>
                    <p>→ No systematic filter exists</p>
                  </div>
                </GlassCard>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="why"
                initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard glow="cyan" className="px-7 py-6">
                  <h3 className="font-display tracking-tight text-xl md:text-2xl font-bold text-cyan mb-4">Why Now</h3>
                  <div className="space-y-3 font-body text-base md:text-lg text-[#EDF1FF]/90">
                    <p>→ Smarter models = better disguised nonsense</p>
                    <p>→ Polished prose hides logical gaps</p>
                    <p>→ "Trust the expert" fails at machine scale</p>
                    <p>→ We need a testable, objective filter</p>
                  </div>
                </GlassCard>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="solution"
                initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard glow="lime" className="px-7 py-6">
                  <h3 className="font-display tracking-tight text-xl md:text-2xl font-bold gradient-text mb-4">The Solution</h3>
                  <div className="space-y-3 font-body text-base md:text-lg text-[#EDF1FF]/90">
                    <p>→ Good explanations are <span className="text-lime font-semibold">hard to vary</span></p>
                    <p>→ Change any detail → breaks the explanation</p>
                    <p>→ David Deutsch, <span className="italic text-[#EDF1FF]/60">The Beginning of Infinity</span></p>
                    <p>→ Productionized as a 5-agent agentic system</p>
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
