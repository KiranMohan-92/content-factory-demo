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
import { fadeUp } from '../../lib/animations'

export function Act3Architecture() {
  const step = usePresentation(s => s.currentStep)

  const progress = step === 0 ? 0 : step === 1 ? 0.2 : step === 2 ? 0.4 : step === 3 ? 0.6 : step === 4 ? 0.8 : step >= 5 ? 1 : 0

  // Each step reveals one agent's detail
  const activePhaseIndex = step >= 1 ? Math.min(step - 1, 4) : -1

  return (
    <div className="w-full h-full relative">
      {/* 3D Scene — occupies top 60% visually */}
      <SceneContainer>
        <ParticleField count={60} color="#ccff00" />
        <GridFloor />

        {/* Pipeline track */}
        <PipelineTrack
          points={DEFAULT_POINTS}
          color="#ccff00"
          active={step >= 1}
          progress={progress}
        />

        {/* Agent spheres */}
        {pipelinePhases.map((phase, i) => (
          <GlowSphere
            key={phase.id}
            position={DEFAULT_POINTS[i]}
            color={phase.color}
            label={phase.label}
            radius={0.25}
            active={step >= 1 && i <= activePhaseIndex}
            pulsate={i === activePhaseIndex}
          />
        ))}

        {/* Quality gates */}
        {step >= 4 && (
          <GateBarrier
            position={[1.8, -0.5, 0]}
            threshold={9.3}
            label="Editor Gate"
            color="#f59e0b"
            passed={step >= 5 ? true : undefined}
            active
          />
        )}
        {step >= 5 && (
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
      <div className="absolute inset-0 z-10 pointer-events-none">

        {/* Title — top area */}
        <div className="pt-[5vh] px-12 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <h2 className="font-editorial text-xl text-muted-foreground italic mb-2">Act III</h2>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold glow-lime">
              5-Agent Pipeline
            </h1>
            <p className="text-muted-foreground font-body text-sm md:text-base mt-2 max-w-lg mx-auto">
              Each agent catches errors the previous can't — like an ensemble of specialized models
            </p>
          </motion.div>
        </div>

        {/* Progressive agent detail — bottom area, one at a time */}
        {step >= 1 && step <= 5 && (
          <motion.div
            key={activePhaseIndex}
            className="absolute bottom-[14vh] left-0 right-0 flex justify-center px-8 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard className="max-w-2xl px-8 py-5 w-full"
              style={{ borderColor: pipelinePhases[activePhaseIndex]?.color + '40' }}
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{
                    background: (pipelinePhases[activePhaseIndex]?.color || '#ccff00') + '20',
                    color: pipelinePhases[activePhaseIndex]?.color,
                    border: `2px solid ${(pipelinePhases[activePhaseIndex]?.color || '#ccff00')}40`
                  }}>
                  {activePhaseIndex + 1}
                </div>
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold"
                    style={{ color: pipelinePhases[activePhaseIndex]?.color }}>
                    {pipelinePhases[activePhaseIndex]?.agent}
                  </h3>
                  {pipelinePhases[activePhaseIndex]?.gate && (
                    <span className="text-sm font-body text-muted-foreground">
                      Quality Gate: ≥{pipelinePhases[activePhaseIndex]?.gate?.threshold}/10
                    </span>
                  )}
                </div>
              </div>
              <p className="font-body text-base md:text-lg text-foreground/90 leading-relaxed">
                {pipelinePhases[activePhaseIndex]?.description}
              </p>
              <div className="mt-3 text-sm font-body text-muted-foreground">
                Output → <span className="text-foreground/70 font-mono">{pipelinePhases[activePhaseIndex]?.output}</span>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* ML Analogies — shown at the end (step 5) */}
        {step >= 5 && (
          <motion.div
            className="absolute bottom-[14vh] left-0 right-0 flex justify-center px-8 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard glow="lime" className="max-w-2xl px-8 py-5 w-full">
              <h3 className="font-display text-xl font-bold text-lime mb-4">
                ✓ PUBLISHED — Both Gates Passed
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {mlAnalogies.map((a, i) => (
                  <motion.div
                    key={a.ml}
                    className="flex gap-3 text-sm font-body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="text-cyan flex-shrink-0">{a.ml}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-foreground/80">{a.cf}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
