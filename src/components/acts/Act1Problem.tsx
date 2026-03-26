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
      {/* 3D Background — 3 orbiting spheres representing bad explanation sources */}
      <SceneContainer>
        <ParticleField count={80} color="#e11d48" />
        <GridFloor />
        {step >= 1 && (
          <GlowSphere position={[-3, 1.5, -1]} color="#f59e0b" label="Books & Gurus" radius={0.35} active pulsate />
        )}
        {step >= 1 && (
          <GlowSphere position={[0, -0.5, -1]} color="#e11d48" label="AI-Generated" radius={0.45} active pulsate />
        )}
        {step >= 1 && (
          <GlowSphere position={[3, 1.5, -1]} color="#9933ff" label="Social Media" radius={0.3} active pulsate />
        )}
        {step >= 2 && (
          <>
            <ConnectionBeam start={[-3, 1.5, -1]} end={[0, -0.5, -1]} color="#e11d48" active />
            <ConnectionBeam start={[3, 1.5, -1]} end={[0, -0.5, -1]} color="#e11d48" active />
            <ConnectionBeam start={[-3, 1.5, -1]} end={[3, 1.5, -1]} color="#e11d48" active />
          </>
        )}
        {step >= 3 && (
          <GlowSphere position={[0, 2.5, 0]} color="#ccff00" label="Hard-to-Vary Filter" sublabel="David Deutsch" radius={0.5} active pulsate />
        )}
      </SceneContainer>

      {/* 2D Overlay — positioned to NOT overlap 3D */}
      <div className="absolute inset-0 z-10 pointer-events-none">

        {/* Step 0: Big title — top area only */}
        <motion.div
          className="pt-[8vh] px-12 text-center"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <h2 className="font-editorial text-xl text-muted-foreground italic mb-3">Act I</h2>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-tight">
            <span className="text-foreground">How Do You Know</span><br />
            <span className="gradient-text">It's a Good Explanation?</span>
          </h1>
        </motion.div>

        {/* Step 1: The crisis — bottom area, clear of 3D center */}
        {step >= 1 && (
          <motion.div
            className="absolute bottom-[14vh] left-0 right-0 flex justify-center px-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <GlassCard className="max-w-3xl px-8 py-6 w-full">
              <p className="font-body text-base md:text-lg text-foreground leading-relaxed">
                Every day we're surrounded by explanations —
                from <span className="text-yellow-400 font-bold">bestselling books</span>,{' '}
                <span className="text-purple font-bold">social media</span>, and now{' '}
                <span className="text-red-400 font-bold">AI systems</span> that generate
                content at unprecedented scale. They sound convincing. They're well-structured.
                They cite sources.
              </p>
              <p className="font-body text-lg md:text-xl text-lime font-bold mt-4">
                But how do we know they're actually correct?
              </p>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 2: The deeper problem */}
        {step >= 2 && (
          <motion.div
            className="absolute bottom-[14vh] left-0 right-0 flex justify-center px-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <GlassCard glow="lime" className="max-w-3xl px-8 py-6 w-full">
              <p className="font-body text-base md:text-lg text-foreground leading-relaxed">
                As AI models get smarter, the content they produce becomes{' '}
                <span className="text-red-400 font-bold">indistinguishable from expert writing</span>.
                Logical inconsistencies hide behind polished prose. Bad explanations
                wear the costume of good ones. The old heuristics — "trust the expert",
                "check the source" — no longer work.
              </p>
              <p className="font-body text-lg md:text-xl text-foreground mt-4">
                We need a <span className="text-lime font-bold">systematic, testable framework</span>{' '}
                for separating good explanations from convincing nonsense.
              </p>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 3: The solution — David Deutsch */}
        {step >= 3 && (
          <motion.div
            className="absolute bottom-[14vh] left-0 right-0 flex justify-center px-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <GlassCard glow="lime" className="max-w-3xl px-8 py-6 w-full">
              <h3 className="font-display text-2xl font-bold text-lime mb-3">
                David Deutsch's Epistemology — Productionized
              </h3>
              <p className="font-body text-base md:text-lg text-foreground leading-relaxed">
                A <span className="text-lime font-bold">good explanation is hard to vary</span> —
                you can't change its details without destroying its ability to explain.
                This single criterion, from <span className="italic text-foreground/90">The Beginning of Infinity</span>,
                gives us an objective, testable filter for every explanation we encounter.
              </p>
              <p className="font-body text-base md:text-lg text-foreground mt-4">
                We built an <span className="text-cyan font-bold">agentic system</span> that
                applies this framework at scale — 5 specialized AI agents that systematically
                test, challenge, and verify every piece of content before publication.
              </p>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
