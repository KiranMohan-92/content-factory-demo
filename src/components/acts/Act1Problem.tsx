import { motion } from 'framer-motion'
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
      {/* 3D — elements in LEFT half, lower area */}
      <SceneContainer>
        <ParticleField count={80} color="#e11d48" />
        <GridFloor />
        {step >= 1 && (
          <>
            <GlowSphere position={[-3.5, -1, -1]} color="#f59e0b" label="Books & Gurus" radius={0.35} active pulsate />
            <GlowSphere position={[-1, -2, -2]} color="#e11d48" label="AI-Generated" radius={0.45} active pulsate />
            <GlowSphere position={[1.5, -1, -1]} color="#9933ff" label="Social Media" radius={0.3} active pulsate />
          </>
        )}
        {step >= 2 && (
          <>
            <ConnectionBeam start={[-3.5, -1, -1]} end={[-1, -2, -2]} color="#e11d48" active />
            <ConnectionBeam start={[1.5, -1, -1]} end={[-1, -2, -2]} color="#e11d48" active />
            <ConnectionBeam start={[-3.5, -1, -1]} end={[1.5, -1, -1]} color="#f59e0b" active />
          </>
        )}
        {step >= 3 && (
          <GlowSphere position={[-1, 1, 1]} color="#ccff00" label="Hard-to-Vary Filter" sublabel="David Deutsch" radius={0.5} active pulsate />
        )}
      </SceneContainer>

      {/* 2D Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Title — top center, clear of 3D */}
        <motion.div
          className="pt-[7vh] px-12 text-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <h2 className="font-editorial text-xl text-muted-foreground italic mb-3">Act I</h2>
          <h1 className="font-display tracking-tight text-5xl md:text-7xl font-extrabold text-metallic">
            The Explanation Test
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-body mt-4">
            Most explanations don't survive it.
          </p>
        </motion.div>

        {/* Step 1: The crisis — RIGHT side card */}
        {step >= 1 && (
          <motion.div
            className="absolute right-10 top-[35vh] max-w-[420px] pointer-events-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <GlassCard glow="lime" className="px-7 py-6">
              <h3 className="font-display tracking-tight text-xl font-bold text-lime glow-lime mb-4">
                The Crisis
              </h3>
              <div className="space-y-3 font-body text-base text-foreground/90">
                <p>→ AI content: convincing but unverifiable</p>
                <p>→ Books & gurus: unfalsifiable advice</p>
                <p>→ Old heuristics: broken at scale</p>
                <p>→ No systematic filter exists</p>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 2: Why now — RIGHT side card (replaces step 1) */}
        {step >= 2 && step < 3 && (
          <motion.div
            className="absolute right-10 top-[35vh] max-w-[420px] pointer-events-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <GlassCard glow="cyan" className="px-7 py-6">
              <h3 className="font-display tracking-tight text-xl font-bold text-cyan mb-4">
                Why Now
              </h3>
              <div className="space-y-3 font-body text-base text-foreground/90">
                <p>→ Smarter models = better disguised nonsense</p>
                <p>→ Polished prose hides logical gaps</p>
                <p>→ "Trust the expert" fails at machine scale</p>
                <p>→ We need a testable, objective filter</p>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 3: The solution — RIGHT side card (replaces step 2) */}
        {step >= 3 && (
          <motion.div
            className="absolute right-10 top-[35vh] max-w-[420px] pointer-events-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <GlassCard glow="lime" className="px-7 py-6">
              <h3 className="font-display tracking-tight text-xl font-bold gradient-text mb-4">
                The Solution
              </h3>
              <div className="space-y-3 font-body text-base text-foreground/90">
                <p>→ Good explanations are <span className="text-lime font-bold">hard to vary</span></p>
                <p>→ Change any detail → breaks the explanation</p>
                <p>→ From <span className="italic text-foreground/70">The Beginning of Infinity</span></p>
                <p>→ Productionized as a 5-agent agentic system</p>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
