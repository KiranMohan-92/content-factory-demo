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
import { OrbitControls } from '@react-three/drei'

export function Act3Architecture() {
  const step = usePresentation(s => s.currentStep)

  // Active agent index (step 1-5 maps to agent 0-4)
  const activeAgent = step >= 1 && step <= 5 ? step - 1 : -1
  const progress = step === 0 ? 0 : Math.min(((step) / 6), 1)

  return (
    <div className="w-full h-full relative">
      {/* 3D Scene with orbit controls */}
      <SceneContainer>
        <OrbitControls enableZoom enablePan={false} autoRotate={step === 0} autoRotateSpeed={0.3} />
        <ParticleField count={60} color="#ccff00" />
        <GridFloor />

        {/* Pipeline track */}
        <PipelineTrack
          points={DEFAULT_POINTS}
          color="#ccff00"
          active={step >= 1}
          progress={progress}
        />

        {/* Agent spheres — light up progressively */}
        {pipelinePhases.map((phase, i) => (
          <GlowSphere
            key={phase.id}
            position={DEFAULT_POINTS[i]}
            color={phase.color}
            label={phase.label}
            radius={i === activeAgent ? 0.35 : 0.25}
            active={step >= 1 && i <= activeAgent}
            pulsate={i === activeAgent}
          />
        ))}

        {/* Quality gates */}
        {step >= 4 && (
          <GateBarrier
            position={[1.8, -0.8, 0]}
            threshold={9.3}
            label="Editor Gate"
            color="#f59e0b"
            passed={step >= 5 ? true : undefined}
            active
          />
        )}
        {step >= 5 && (
          <GateBarrier
            position={[4.2, -0.3, 0]}
            threshold={9.5}
            label="CODEX Gate"
            color="#ec4899"
            passed={step >= 6 ? true : undefined}
            active
          />
        )}
      </SceneContainer>

      {/* 2D Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">

        {/* Title — top center */}
        <div className="pt-[5vh] px-12 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <h2 className="font-editorial text-xl text-muted-foreground italic mb-2">Act III</h2>
            <h1 className="font-display tracking-tight text-4xl md:text-6xl font-extrabold text-metallic">
              5-Agent Pipeline
            </h1>
            <p className="text-base md:text-lg text-foreground/60 font-body mt-3 max-w-xl mx-auto">
              Each agent catches errors the previous can't — like an ensemble of specialized models
            </p>
          </motion.div>
        </div>

        {/* Steps 1-5: Agent detail cards — RIGHT side */}
        {activeAgent >= 0 && activeAgent < 5 && (
          <motion.div
            key={activeAgent}
            className="absolute right-10 top-[28vh] max-w-[440px] pointer-events-auto"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard
              className="px-7 py-6"
              glow={activeAgent === 4 ? 'cyan' : 'lime'}
              style={activeAgent === 4 ? { borderColor: 'rgba(236, 72, 153, 0.3)' } : undefined}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold font-display"
                  style={{
                    background: (pipelinePhases[activeAgent].color) + '20',
                    color: pipelinePhases[activeAgent].color,
                    border: `2px solid ${pipelinePhases[activeAgent].color}50`,
                    boxShadow: `0 0 15px ${pipelinePhases[activeAgent].color}20`
                  }}>
                  {activeAgent + 1}
                </div>
                <div>
                  <h3 className="font-display tracking-tight text-2xl md:text-3xl font-bold"
                    style={{ color: pipelinePhases[activeAgent].color, textShadow: `0 0 15px ${pipelinePhases[activeAgent].color}30` }}>
                    {pipelinePhases[activeAgent].agent}
                  </h3>
                  {pipelinePhases[activeAgent].gate && (
                    <span className="text-sm font-body text-muted-foreground">
                      Quality Gate: ≥{pipelinePhases[activeAgent].gate!.threshold}/10
                    </span>
                  )}
                </div>
              </div>
              <p className="font-body text-base md:text-lg text-foreground/85 leading-relaxed">
                {pipelinePhases[activeAgent].description}
              </p>
              <div className="mt-4 pt-3 border-t border-border/30 text-sm font-body text-muted-foreground flex items-center gap-2">
                <span className="text-foreground/50">Output →</span>
                <code className="text-foreground/70 bg-muted/30 px-2 py-0.5 rounded text-sm">
                  {pipelinePhases[activeAgent].output}
                </code>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Step 6: Publish Ready */}
        {step >= 6 && (
          <motion.div
            className="absolute bottom-[14vh] left-0 right-0 flex justify-center px-8 pointer-events-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <GlassCard glow="lime" className="max-w-2xl px-8 py-6 w-full text-center">
              <h3 className="font-display tracking-tight text-2xl md:text-3xl font-bold text-lime glow-lime mb-3">
                ✓ Publish Ready
              </h3>
              <p className="font-body text-base text-foreground/70 mb-5">
                Both quality gates passed. Sequential error correction complete.
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-left max-w-md mx-auto">
                {mlAnalogies.map((a, i) => (
                  <motion.div
                    key={a.ml}
                    className="flex gap-2 text-sm font-body"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <span className="text-cyan flex-shrink-0">{a.ml}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-foreground/70">{a.cf}</span>
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
