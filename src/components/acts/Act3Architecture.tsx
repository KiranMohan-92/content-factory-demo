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
import { OrbitControls } from '@react-three/drei'

const AGENT_SCREEN_X = ['12%', '28%', '44%', '60%', '76%']

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
          <GateBarrier position={[1.8, -0.8, 0]} threshold={9.5} label="Editor Gate" color="#f59e0b"
            passed={step >= 5 ? true : undefined} active />
        )}
        {step >= 5 && (
          <GateBarrier position={[4.2, -0.3, 0]} threshold={9.3} label="CODEX Gate" color="#ec4899"
            passed={step >= 6 ? true : undefined} active />
        )}
      </SceneContainer>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pt-[4vh] md:pt-[5vh] px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-editorial text-xl md:text-2xl text-muted-foreground italic mb-2">Act III</h2>
            <h1 className="font-display tracking-tight text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#EDF1FF]">
              5-Agent Pipeline
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-body mt-3 max-w-xl mx-auto">
              Each agent catches errors the previous can't
            </p>
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {activeAgent >= 0 && activeAgent < 5 && (
            <motion.div
              key={activeAgent}
              className="absolute bottom-[10vh] md:bottom-[12vh] pointer-events-auto px-4"
              style={{ left: AGENT_SCREEN_X[activeAgent], transform: 'translateX(-50%)', maxWidth: 'min(420px, 88vw)' }}
              initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlassCard
                className="px-6 md:px-7 py-5 md:py-6"
                glow={activeAgent === 4 ? 'cyan' : 'lime'}
                style={activeAgent === 4 ? { borderColor: 'rgba(236, 72, 153, 0.25)' } : undefined}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-lg font-bold font-display flex-shrink-0"
                    style={{
                      background: pipelinePhases[activeAgent].color + '15',
                      color: pipelinePhases[activeAgent].color,
                      border: `1.5px solid ${pipelinePhases[activeAgent].color}40`,
                      boxShadow: `0 0 20px ${pipelinePhases[activeAgent].color}15`
                    }}>
                    {activeAgent + 1}
                  </div>
                  <div>
                    <h3 className="font-display tracking-tight text-xl md:text-2xl font-bold text-shine"
                      style={{ color: pipelinePhases[activeAgent].color }}>
                      {pipelinePhases[activeAgent].agent}
                    </h3>
                    {pipelinePhases[activeAgent].gate && (
                      <span className="text-sm md:text-base font-body text-muted-foreground">
                        Gate: ≥{pipelinePhases[activeAgent].gate!.threshold}/10
                      </span>
                    )}
                  </div>
                </div>
                <p className="font-body text-base md:text-lg text-[#EDF1FF]/85 leading-relaxed">
                  {pipelinePhases[activeAgent].description}
                </p>
                <div className="mt-3 pt-2 border-t border-white/5 text-sm md:text-base font-mono text-muted-foreground">
                  → <code className="text-[#EDF1FF]/50">{pipelinePhases[activeAgent].output}</code>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {step >= 6 && (
            <motion.div key="publish"
              className="absolute bottom-[10vh] md:bottom-[12vh] inset-x-0 flex justify-center px-4 pointer-events-auto"
              initial={{ opacity: 0, scale: 0.95, filter: 'blur(8px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <GlassCard glow="lime" className="max-w-[90vw] md:max-w-xl px-7 md:px-8 py-6 text-center">
                <h3 className="font-display tracking-tight text-2xl md:text-3xl font-bold text-lime glow-lime mb-3">
                  ✓ Publish Ready
                </h3>
                <p className="font-body text-base md:text-lg text-[#EDF1FF]/60 mb-5">
                  Both quality gates passed. Sequential error correction complete.
                </p>
                <div className="grid grid-cols-2 gap-x-5 gap-y-2 text-left max-w-md mx-auto">
                  {mlAnalogies.map((a) => (
                    <div key={a.ml} className="flex gap-2 text-sm md:text-base font-body">
                      <span className="text-cyan">{a.ml}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-[#EDF1FF]/60">{a.cf}</span>
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
