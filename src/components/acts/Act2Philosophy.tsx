import { motion, AnimatePresence } from 'framer-motion'
import { usePresentation } from '../../stores/presentation'
import { SceneContainer } from '../three/SceneContainer'
import { GlowSphere } from '../three/GlowSphere'
import { ConnectionBeam } from '../three/ConnectionBeam'
import { ParticleField } from '../three/ParticleField'
import { GridFloor } from '../three/GridFloor'
import { GlassCard } from '../shared/GlassCard'
import { deutschTests } from '../../data/deutsch-tests'
import { fadeUp } from '../../lib/animations'
import { useMemo } from 'react'

const PENTAGON_RADIUS = 1.8
const TWO_PI = Math.PI * 2

function getPentagonPositions(rotation: number): [number, number, number][] {
  return Array.from({ length: 5 }, (_, i) => {
    const angle = (i * TWO_PI) / 5 - Math.PI / 2 + rotation
    return [Math.cos(angle) * PENTAGON_RADIUS, Math.sin(angle) * PENTAGON_RADIUS, 0]
  })
}

const edges: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,0]]

export function Act2Philosophy() {
  const step = usePresentation(s => s.currentStep)

  const activeTestIndex = step >= 2 ? Math.min(step - 2, 4) : -1
  const rotation = activeTestIndex >= 0 ? -(activeTestIndex * TWO_PI / 5) : 0
  const positions = useMemo(() => getPentagonPositions(rotation), [rotation])

  // Pentagon shifts left and down when descriptions show
  const groupX = step >= 2 ? -2.2 : 0
  const groupY = -0.5 // Always slightly below center to avoid header

  return (
    <div className="w-full h-full relative">
      <SceneContainer>
        <ParticleField count={80} color="#00b8b8" />
        <GridFloor />
        <group position={[groupX, groupY, 0]}>
          {deutschTests.map((test, i) => {
            const showLabel = step >= 2 ? i <= activeTestIndex : (step === 1 && i === 0)
            return (
              <GlowSphere
                key={test.name}
                position={positions[i]}
                color={test.color}
                label={showLabel ? test.name : ''}
                sublabel={i === activeTestIndex && step >= 2 ? test.mlAnalogy : ''}
                radius={i === activeTestIndex ? 0.32 : 0.22}
                active={step >= 1}
                pulsate={i === activeTestIndex}
              />
            )
          })}
          {step >= 1 && edges.map(([a, b], i) => (
            <ConnectionBeam key={i} start={positions[a]} end={positions[b]} color={deutschTests[a].color} active />
          ))}
          {step >= 6 && (
            <GlowSphere position={[0, 0, 0]} color="#ffffff" label="Good Explanation" sublabel="Passes all 5 tests" radius={0.35} active pulsate />
          )}
        </group>
      </SceneContainer>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pt-[5vh] md:pt-[6vh] px-6 md:px-12 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <h2 className="font-editorial text-lg md:text-xl text-muted-foreground italic mb-2">Act II</h2>
            <h1 className="font-display tracking-tight text-3xl md:text-5xl lg:text-6xl font-extrabold text-metallic">
              Epistemology as a Loss Function
            </h1>
            <p className="text-sm md:text-base text-muted-foreground font-body mt-2 md:mt-3 max-w-md mx-auto">
              5 independent tests — the epistemological equivalent of cross-validation
            </p>
          </motion.div>
        </div>

        {/* Step 1: Intro */}
        {step === 1 && (
          <motion.div className="absolute bottom-[12vh] inset-x-0 flex justify-center px-4 md:px-8 pointer-events-auto"
            variants={fadeUp} initial="hidden" animate="visible">
            <GlassCard className="max-w-[90vw] md:max-w-lg px-6 md:px-7 py-5">
              <p className="text-sm md:text-base font-body text-foreground/80 leading-relaxed">
                David Deutsch's framework from <span className="text-foreground italic">The Beginning of Infinity</span>{' '}
                gives us <span className="text-lime font-semibold">5 independent validators</span>. Each catches a specific failure mode.
              </p>
            </GlassCard>
          </motion.div>
        )}

        {/* Steps 2-6: Test descriptions — center-right, one at a time */}
        <div className="absolute right-4 md:right-[8vw] top-[30vh] md:top-[28vh] max-w-[85vw] md:max-w-[400px] pointer-events-auto">
          <AnimatePresence mode="wait">
            {step >= 2 && step <= 6 && activeTestIndex >= 0 && activeTestIndex < 5 && (
              <motion.div key={activeTestIndex}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard className="px-5 md:px-7 py-5 md:py-6">
                  <h3 className="font-display tracking-tight text-xl md:text-2xl font-bold text-shine mb-1"
                    style={{ color: deutschTests[activeTestIndex].color }}>
                    {deutschTests[activeTestIndex].name}
                  </h3>
                  <p className="text-sm md:text-base font-body text-cyan mb-3">
                    ≈ {deutschTests[activeTestIndex].mlAnalogy}
                  </p>
                  <div className="space-y-2.5 font-body text-sm md:text-base text-foreground/90">
                    <p>→ {deutschTests[activeTestIndex].description}</p>
                    <div className="mt-2 p-3 rounded bg-lime/5 border border-lime/15">
                      <span className="text-lime text-xs md:text-sm font-bold">✓ Pass:</span>
                      <p className="text-xs md:text-sm text-foreground/70 mt-1">{deutschTests[activeTestIndex].passExample}</p>
                    </div>
                    <div className="p-3 rounded bg-red-500/5 border border-red-500/15">
                      <span className="text-red-400 text-xs md:text-sm font-bold">✗ Fail:</span>
                      <p className="text-xs md:text-sm text-foreground/70 mt-1">{deutschTests[activeTestIndex].failExample}</p>
                    </div>
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
