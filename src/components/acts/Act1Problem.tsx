import { motion, AnimatePresence } from 'framer-motion'
import { usePresentation } from '../../stores/presentation'
import { SceneContainer } from '../three/SceneContainer'
import { GlowSphere } from '../three/GlowSphere'
import { ConnectionBeam } from '../three/ConnectionBeam'
import { ParticleField } from '../three/ParticleField'
import { GridFloor } from '../three/GridFloor'
import { GlassCard } from '../shared/GlassCard'
import { fadeUp } from '../../lib/animations'

export function Act1Problem() {
  const step = usePresentation(s => s.currentStep)

  return (
    <div className="w-full h-full relative">
      <SceneContainer>
        <ParticleField count={80} color="#e11d48" />
        <GridFloor />
        {step >= 1 && (
          <>
            <GlowSphere position={[-3, -1.5, -2]} color="#f59e0b" label="Books & Gurus" radius={0.3} active pulsate />
            <GlowSphere position={[0, -2, -3]} color="#e11d48" label="AI-Generated" radius={0.4} active pulsate />
            <GlowSphere position={[3, -1.5, -2]} color="#9933ff" label="Social Media" radius={0.28} active pulsate />
          </>
        )}
        {step >= 2 && (
          <>
            <ConnectionBeam start={[-3, -1.5, -2]} end={[0, -2, -3]} color="#e11d48" active />
            <ConnectionBeam start={[3, -1.5, -2]} end={[0, -2, -3]} color="#e11d48" active />
            <ConnectionBeam start={[-3, -1.5, -2]} end={[3, -1.5, -2]} color="#f59e0b" active />
          </>
        )}
        {step >= 3 && (
          <GlowSphere position={[0, 0.5, 0]} color="#ccff00" label="Hard-to-Vary Filter" sublabel="David Deutsch" radius={0.45} active pulsate />
        )}
      </SceneContainer>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Title */}
        <motion.div
          className="pt-[6vh] md:pt-[7vh] px-6 md:px-12 text-center"
          variants={fadeUp} initial="hidden" animate="visible" custom={0}
        >
          <h2 className="font-editorial text-lg md:text-xl text-muted-foreground italic mb-3">Act I</h2>
          <h1 className="font-display tracking-tight text-4xl md:text-6xl lg:text-7xl font-extrabold text-metallic">
            The Explanation Test
          </h1>
          <p className="text-base md:text-lg text-muted-foreground font-body mt-3 md:mt-4">
            Most explanations don't survive it.
          </p>
        </motion.div>

        {/* Step cards — one at a time, centered */}
        <div className="absolute inset-x-0 bottom-[12vh] md:bottom-[14vh] flex justify-center px-4 md:px-12 pointer-events-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="crisis" className="w-full max-w-[90vw] md:max-w-lg"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard glow="lime" className="px-6 md:px-8 py-5 md:py-6">
                  <h3 className="font-display tracking-tight text-lg md:text-xl font-bold text-lime glow-lime mb-3">The Crisis</h3>
                  <div className="space-y-2.5 font-body text-sm md:text-base text-foreground/90">
                    <p>→ AI content: convincing but unverifiable</p>
                    <p>→ Books & gurus: unfalsifiable advice</p>
                    <p>→ Old heuristics: broken at scale</p>
                    <p>→ No systematic filter exists</p>
                  </div>
                </GlassCard>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="why" className="w-full max-w-[90vw] md:max-w-lg"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard glow="cyan" className="px-6 md:px-8 py-5 md:py-6">
                  <h3 className="font-display tracking-tight text-lg md:text-xl font-bold text-cyan mb-3">Why Now</h3>
                  <div className="space-y-2.5 font-body text-sm md:text-base text-foreground/90">
                    <p>→ Smarter models = better disguised nonsense</p>
                    <p>→ Polished prose hides logical gaps</p>
                    <p>→ "Trust the expert" fails at machine scale</p>
                    <p>→ We need a testable, objective filter</p>
                  </div>
                </GlassCard>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="solution" className="w-full max-w-[90vw] md:max-w-lg"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard glow="lime" className="px-6 md:px-8 py-5 md:py-6">
                  <h3 className="font-display tracking-tight text-lg md:text-xl font-bold gradient-text mb-3">The Solution</h3>
                  <div className="space-y-2.5 font-body text-sm md:text-base text-foreground/90">
                    <p>→ Good explanations are <span className="text-lime font-semibold">hard to vary</span></p>
                    <p>→ Change any detail → breaks the explanation</p>
                    <p>→ From <span className="italic text-foreground/70">The Beginning of Infinity</span></p>
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
