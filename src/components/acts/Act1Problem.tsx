import { motion } from 'framer-motion'
import { usePresentation } from '../../stores/presentation'
import { SceneContainer } from '../three/SceneContainer'
import { DataOrb } from '../three/DataOrb'
import { ConnectionBeam } from '../three/ConnectionBeam'
import { ParticleField } from '../three/ParticleField'
import { GridFloor } from '../three/GridFloor'
import { GlassCard } from '../shared/GlassCard'
import { AnimatedCounter } from '../shared/AnimatedCounter'
import { gapData } from '../../data/gap-story'
import { fadeUp } from '../../lib/animations'

export function Act1Problem() {
  const step = usePresentation(s => s.currentStep)

  return (
    <div className="w-full h-full relative">
      {/* 3D Background */}
      <SceneContainer>
        <ParticleField count={100} color="#ccff00" />
        <GridFloor />
        <DataOrb
          position={[-2.5, 0.5, 0]}
          value={step >= 1 ? '9.4' : '—'}
          label="Internal Review"
          color="#ccff00"
          active={step >= 0}
        />
        {step >= 1 && (
          <>
            <DataOrb
              position={[2.5, 0.5, 0]}
              value="6.5"
              label="External Review"
              color="#e11d48"
              active
            />
            <ConnectionBeam
              start={[-1.8, 0.5, 0]}
              end={[1.8, 0.5, 0]}
              color="#f59e0b"
              active={step >= 1}
            />
          </>
        )}
      </SceneContainer>

      {/* 2D Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-8">
        {/* Step 0: Title */}
        <motion.div
          className="text-center mb-8"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <h2 className="font-editorial text-lg text-muted-foreground italic mb-2">Act I</h2>
          <h1 className="font-display text-5xl md:text-7xl font-bold glow-lime">
            The Overfitting Problem
          </h1>
          <p className="text-muted-foreground font-body text-sm mt-4 max-w-lg mx-auto">
            Your model scores 9.4 on training data...
          </p>
        </motion.div>

        {/* Step 1: Score counter */}
        {step >= 1 && (
          <motion.div
            className="flex items-center gap-8 mb-8"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <div className="text-center">
              <div className="text-xs text-muted-foreground font-body mb-1">INTERNAL</div>
              <AnimatedCounter from={0} to={9.4} className="text-5xl" active={step >= 1} suffix="/10" />
            </div>
            <div className="text-3xl text-warning font-display font-bold">→</div>
            <div className="text-center">
              <div className="text-xs text-muted-foreground font-body mb-1">EXTERNAL</div>
              <AnimatedCounter from={9.4} to={6.5} className="text-5xl" active={step >= 1} suffix="/10" duration={2500} />
            </div>
            <div className="glass-card px-4 py-2 text-center">
              <div className="text-xs text-muted-foreground">GAP</div>
              <div className="text-2xl font-display font-bold text-warning">2.9</div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Error table */}
        {step >= 2 && (
          <motion.div
            className="w-full max-w-3xl pointer-events-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <GlassCard className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-body text-lime mb-2 uppercase tracking-wider">What Internal Caught ✓</h3>
                  {gapData.whatCaught.map((item, i) => (
                    <motion.div
                      key={item}
                      className="text-xs font-body text-foreground/80 py-1 border-b border-border/30 last:border-0"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <span className="text-lime mr-1">✓</span> {item}
                    </motion.div>
                  ))}
                </div>
                <div>
                  <h3 className="text-xs font-body text-red-500 mb-2 uppercase tracking-wider">What It Missed ✗</h3>
                  {gapData.whatMissed.map((item, i) => (
                    <motion.div
                      key={item}
                      className="text-xs font-body text-foreground/80 py-1 border-b border-border/30 last:border-0"
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    >
                      <span className="text-red-500 mr-1">✗</span> {item}
                    </motion.div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 3: Callout */}
        {step >= 3 && (
          <motion.div
            className="mt-6 max-w-xl text-center"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <GlassCard glow="lime" className="px-6 py-4">
              <p className="font-body text-sm text-foreground">
                <span className="text-lime font-bold">This is overfitting.</span>{' '}
                Optimizing for internal metrics while failing external validation.
                The content looked perfect by every internal measure — and was{' '}
                <span className="text-red-400">factually wrong</span>.
              </p>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
