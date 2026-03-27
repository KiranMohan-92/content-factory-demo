import { motion, AnimatePresence } from 'framer-motion'
import { usePresentation } from '../../stores/presentation'
import { SceneContainer } from '../three/SceneContainer'
import { GlowSphere } from '../three/GlowSphere'
import { ConnectionBeam } from '../three/ConnectionBeam'
import { ParticleField } from '../three/ParticleField'
import { GridFloor } from '../three/GridFloor'
import { GlassCard } from '../shared/GlassCard'
import { deutschTests } from '../../data/deutsch-tests'
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
  const groupX = step >= 2 ? -2.5 : 0

  return (
    <div className="w-full h-full relative">
      <SceneContainer>
        <ParticleField count={80} color="#4DD9D0" />
        <GridFloor />
        <group position={[groupX, -0.5, 0]}>
          {deutschTests.map((test, i) => {
            const showLabel = step >= 2 ? i <= activeTestIndex : false
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
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-editorial text-xl md:text-2xl text-muted-foreground italic mb-2">Act II</h2>
            <h1 className="font-display tracking-tight text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#EDF1FF]">
              Epistemology as a Loss Function
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-body mt-3 max-w-lg mx-auto">
              5 independent tests — the epistemological equivalent of cross-validation
            </p>
          </motion.div>
        </div>

        {step === 1 && (
          <motion.div className="absolute bottom-[12vh] inset-x-0 flex justify-center px-4 md:px-8 pointer-events-auto"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <GlassCard className="max-w-[90vw] md:max-w-lg px-7 py-6">
              <p className="text-base md:text-lg font-body text-[#EDF1FF]/80 leading-relaxed">
                David Deutsch's framework from <span className="text-[#EDF1FF] italic">The Beginning of Infinity</span>{' '}
                gives us <span className="text-lime font-semibold glow-lime">5 independent validators</span>. Each catches a specific failure mode.
              </p>
            </GlassCard>
          </motion.div>
        )}

        <div className="absolute left-[4vw] md:left-[55vw] top-[28vh] md:top-[26vh] w-[92vw] md:w-[440px] pointer-events-auto">
          <AnimatePresence mode="wait">
            {step >= 2 && step <= 6 && activeTestIndex >= 0 && activeTestIndex < 5 && (
              <motion.div key={activeTestIndex}
                initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard className="px-7 py-6">
                  <h3 className="font-display tracking-tight text-2xl md:text-3xl font-bold mb-1"
                    style={{ color: deutschTests[activeTestIndex].color, textShadow: `0 0 20px ${deutschTests[activeTestIndex].color}40` }}>
                    {deutschTests[activeTestIndex].name}
                  </h3>
                  <p className="text-base md:text-lg font-body text-cyan mb-4">
                    ≈ {deutschTests[activeTestIndex].mlAnalogy}
                  </p>
                  <div className="space-y-3 font-body text-base md:text-lg text-[#EDF1FF]/90">
                    <p>→ {deutschTests[activeTestIndex].description}</p>
                    <div className="mt-3 p-4 rounded-lg bg-lime/5 border border-lime/15">
                      <span className="text-lime text-sm md:text-base font-bold">✓ Pass:</span>
                      <p className="text-sm md:text-base text-[#EDF1FF]/70 mt-1">{deutschTests[activeTestIndex].passExample}</p>
                    </div>
                    <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/15">
                      <span className="text-red-400 text-sm md:text-base font-bold">✗ Fail:</span>
                      <p className="text-sm md:text-base text-[#EDF1FF]/70 mt-1">{deutschTests[activeTestIndex].failExample}</p>
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
