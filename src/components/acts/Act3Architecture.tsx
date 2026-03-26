import { motion } from 'framer-motion'
import { usePresentation } from '../../stores/presentation'
import { SceneContainer } from '../three/SceneContainer'
import { GlowSphere } from '../three/GlowSphere'
import { PipelineTrack, DEFAULT_POINTS } from '../three/PipelineTrack'
import { GateBarrier } from '../three/GateBarrier'
import { ParticleField } from '../three/ParticleField'
import { GridFloor } from '../three/GridFloor'
import { GlassCard } from '../shared/GlassCard'
import { pipelinePhases, mlAnalogies } from '../../data/pipeline-phases'
import { fadeUp, slideLeft } from '../../lib/animations'

export function Act3Architecture() {
  const step = usePresentation(s => s.currentStep)

  const progress = step === 0 ? 0 : step === 1 ? 0.4 : step === 2 ? 0.6 : step === 3 ? 0.8 : step >= 4 ? 1 : 0

  return (
    <div className="w-full h-full relative">
      {/* 3D Scene */}
      <SceneContainer>
        <ParticleField count={80} color="#ccff00" />
        <GridFloor />

        {/* Pipeline track */}
        {step >= 0 && (
          <PipelineTrack
            points={DEFAULT_POINTS}
            color="#ccff00"
            active={step >= 1}
            progress={progress}
          />
        )}

        {/* Agent spheres along pipeline */}
        {pipelinePhases.map((phase, i) => (
          <GlowSphere
            key={phase.id}
            position={DEFAULT_POINTS[i]}
            color={phase.color}
            label={step >= 0 ? phase.label : ''}
            sublabel={phase.agent}
            radius={0.25}
            active={step >= 0}
            pulsate={step >= 1}
          />
        ))}

        {/* Quality gates */}
        {step >= 3 && (
          <GateBarrier
            position={[1.8, -0.5, 0]}
            threshold={9.3}
            label="Editor Gate"
            color="#f59e0b"
            passed={step >= 4 ? true : undefined}
            active
          />
        )}
        {step >= 4 && (
          <GateBarrier
            position={[4.2, 0, 0]}
            threshold={9.5}
            label="CODEX Gate"
            color="#ec4899"
            passed={step >= 5 ? true : undefined}
            active
          />
        )}
      </SceneContainer>

      {/* 2D Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none px-8">
        {/* Title */}
        <div className="flex flex-col items-center pt-8">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center">
            <h2 className="font-editorial text-lg text-muted-foreground italic mb-2">Act III</h2>
            <h1 className="font-display text-4xl md:text-5xl font-bold glow-lime">
              5-Agent Sequential Error Correction
            </h1>
            <p className="text-muted-foreground font-body text-xs mt-2">
              Like an ensemble of specialized models — each catches errors the previous can't
            </p>
          </motion.div>
        </div>

        {/* Phase detail cards (left side) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 max-w-[260px] pointer-events-auto">
          {pipelinePhases.map((phase, i) => {
            const isHighlighted = (step === 1 && i <= 2) || (step === 2 && i <= 2) || (step === 3 && i === 3) || (step === 4 && i === 4) || step >= 5
            return (
              <motion.div
                key={phase.id}
                variants={slideLeft}
                initial="hidden"
                animate={step >= 0 ? 'visible' : 'hidden'}
                custom={i * 0.1}
              >
                <div
                  className={`glass-card p-2.5 transition-all duration-300 ${isHighlighted ? 'border-opacity-40' : 'opacity-40'}`}
                  style={{ borderColor: isHighlighted ? phase.color + '66' : undefined }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full" style={{ background: phase.color }} />
                    <span className="text-[11px] font-display font-bold" style={{ color: phase.color }}>
                      {phase.label}
                    </span>
                    {phase.gate && (
                      <span className="text-[9px] font-body text-muted-foreground ml-auto">
                        ≥{phase.gate.threshold}
                      </span>
                    )}
                  </div>
                  <p className="text-[9px] font-body text-muted-foreground leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* ML Analogies table (right side) */}
        {step >= 2 && (
          <motion.div
            className="absolute right-6 top-1/2 -translate-y-1/2 max-w-[240px] pointer-events-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <GlassCard className="p-3">
              <h3 className="text-[10px] font-body text-cyan uppercase tracking-wider mb-2">ML Analogies</h3>
              <div className="space-y-1.5">
                {mlAnalogies.map((a, i) => (
                  <motion.div
                    key={a.ml}
                    className="flex gap-2 text-[9px] font-body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <span className="text-cyan flex-shrink-0 w-[90px]">{a.ml}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-foreground/80">{a.cf}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Gate result messages */}
        {step === 3 && (
          <motion.div
            className="absolute bottom-28 left-0 right-0 flex justify-center"
            variants={fadeUp} initial="hidden" animate="visible"
          >
            <GlassCard glow="lime" className="px-6 py-3">
              <p className="text-sm font-body">
                <span className="text-yellow-400 font-bold">Editor Gate: 9.3/10</span>
                <span className="text-muted-foreground ml-3">— 7-pass review with weighted scoring</span>
              </p>
            </GlassCard>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            className="absolute bottom-28 left-0 right-0 flex justify-center"
            variants={fadeUp} initial="hidden" animate="visible"
          >
            <GlassCard glow="cyan" className="px-6 py-3">
              <p className="text-sm font-body">
                <span className="text-pink-400 font-bold">CODEX Gate: 9.5/10</span>
                <span className="text-muted-foreground ml-3">— Hostile cross-examination. Top 0.01% standard.</span>
              </p>
            </GlassCard>
          </motion.div>
        )}

        {step >= 5 && (
          <motion.div
            className="absolute bottom-28 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <GlassCard glow="lime" className="px-8 py-4">
              <p className="text-lg font-display font-bold text-lime text-center">
                ✓ PUBLISHED — Both gates passed
              </p>
              <p className="text-xs font-body text-muted-foreground text-center mt-1">
                Sequential error correction complete. Each agent caught errors the previous missed.
              </p>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
