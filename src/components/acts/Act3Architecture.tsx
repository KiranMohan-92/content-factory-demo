import { motion, AnimatePresence } from 'framer-motion'
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

// Map agent index to horizontal screen position (percentage from left)
const AGENT_SCREEN_X = ['10%', '25%', '42%', '58%', '72%']

export function Act3Architecture() {
  const step = usePresentation(s => s.currentStep)
  const activeAgent = step >= 1 && step <= 5 ? step - 1 : -1
  const progress = step === 0 ? 0 : Math.min(step / 6, 1)

  return (
    <div className="w-full h-full relative">
      <SceneContainer>
        <OrbitControls enableZoom enablePan={false} autoRotate={step === 0} autoRotateSpeed={0.3} />
        <ParticleField count={60} color="#ccff00" />
        <GridFloor />
        <PipelineTrack points={DEFAULT_POINTS} color="#ccff00" active={step >= 1} progress={progress} />
        {pipelinePhases.map((phase, i) => (
          <GlowSphere
            key={phase.id}
            position={DEFAULT_POINTS[i]}
            color={phase.color}
            label={phase.label}
            radius={i === activeAgent ? 0.35 : 0.25}
            active={step >= 1 && i <= (activeAgent >= 0 ? activeAgent : -1)}
            pulsate={i === activeAgent}
          />
        ))}
        {step >= 4 && (
          <GateBarrier position={[1.8, -0.8, 0]} threshold={9.3} label="Editor Gate" color="#f59e0b"
            passed={step >= 5 ? true : undefined} active />
        )}
        {step >= 5 && (
          <GateBarrier position={[4.2, -0.3, 0]} threshold={9.5} label="CODEX Gate" color="#ec4899"
            passed={step >= 6 ? true : undefined} active />
        )}
      </SceneContainer>

      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Title */}
        <div className="pt-[4vh] md:pt-[5vh] px-6 md:px-12 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <h2 className="font-editorial text-lg md:text-xl text-muted-foreground italic mb-2">Act III</h2>
            <h1 className="font-display tracking-tight text-3xl md:text-5xl lg:text-6xl font-extrabold text-metallic">
              5-Agent Pipeline
            </h1>
            <p className="text-sm md:text-base text-foreground/50 font-body mt-2 max-w-lg mx-auto">
              Each agent catches errors the previous can't
            </p>
          </motion.div>
        </div>

        {/* Agent cards — positioned near each agent, one at a time */}
        <AnimatePresence mode="wait">
          {activeAgent >= 0 && activeAgent < 5 && (
            <motion.div
              key={activeAgent}
              className="absolute bottom-[10vh] md:bottom-[12vh] pointer-events-auto px-4"
              style={{ left: AGENT_SCREEN_X[activeAgent], transform: 'translateX(-50%)', maxWidth: 'min(400px, 85vw)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard
                className="px-5 md:px-6 py-4 md:py-5"
                glow={activeAgent === 4 ? 'cyan' : 'lime'}
                style={activeAgent === 4 ? { borderColor: 'rgba(236, 72, 153, 0.3)' } : undefined}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center text-base font-bold font-display flex-shrink-0"
                    style={{
                      background: pipelinePhases[activeAgent].color + '20',
                      color: pipelinePhases[activeAgent].color,
                      border: `2px solid ${pipelinePhases[activeAgent].color}50`,
                      boxShadow: `0 0 15px ${pipelinePhases[activeAgent].color}20`
                    }}>
                    {activeAgent + 1}
                  </div>
                  <div>
                    <h3 className="font-display tracking-tight text-lg md:text-xl font-bold text-shine"
                      style={{ color: pipelinePhases[activeAgent].color }}>
                      {pipelinePhases[activeAgent].agent}
                    </h3>
                    {pipelinePhases[activeAgent].gate && (
                      <span className="text-xs md:text-sm font-body text-muted-foreground">
                        Gate: ≥{pipelinePhases[activeAgent].gate!.threshold}/10
                      </span>
                    )}
                  </div>
                </div>
                <p className="font-body text-sm md:text-base text-foreground/85 leading-relaxed">
                  {pipelinePhases[activeAgent].description}
                </p>
                <div className="mt-3 pt-2 border-t border-border/20 text-xs md:text-sm font-mono text-muted-foreground">
                  Output → <code className="text-foreground/60">{pipelinePhases[activeAgent].output}</code>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {step >= 6 && (
            <motion.div key="publish"
              className="absolute bottom-[10vh] md:bottom-[12vh] inset-x-0 flex justify-center px-4 pointer-events-auto"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
              <GlassCard glow="lime" className="max-w-[90vw] md:max-w-xl px-6 md:px-8 py-5 md:py-6 text-center">
                <h3 className="font-display tracking-tight text-xl md:text-2xl font-bold text-lime glow-lime mb-3">
                  ✓ Publish Ready
                </h3>
                <p className="font-body text-sm md:text-base text-foreground/60 mb-4">
                  Both quality gates passed. Sequential error correction complete.
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-left max-w-sm mx-auto">
                  {mlAnalogies.map((a) => (
                    <div key={a.ml} className="flex gap-1.5 text-xs md:text-sm font-body">
                      <span className="text-cyan">{a.ml}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-foreground/60">{a.cf}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
