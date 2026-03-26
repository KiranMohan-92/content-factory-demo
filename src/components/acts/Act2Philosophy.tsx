import { motion } from 'framer-motion'
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

const PENTAGON_RADIUS = 2.5
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

  // Rotation to bring the active test to the top
  const activeTestIndex = step >= 2 ? Math.min(step - 2, 4) : -1
  const rotation = activeTestIndex >= 0 ? -(activeTestIndex * TWO_PI / 5) : 0

  const positions = useMemo(() => getPentagonPositions(rotation), [rotation])

  // Shift pentagon left when showing descriptions (steps 2+)
  const groupX = step >= 2 ? -2.5 : 0

  return (
    <div className="w-full h-full relative">
      {/* 3D Scene */}
      <SceneContainer>
        <ParticleField count={80} color="#00b8b8" />
        <GridFloor />

        <group position={[groupX, 0, 0]}>
          {/* Pentagon spheres */}
          {deutschTests.map((test, i) => (
            <GlowSphere
              key={test.name}
              position={positions[i]}
              color={test.color}
              label={step >= 1 ? test.name : ''}
              sublabel={step >= 2 && i === activeTestIndex ? test.mlAnalogy : ''}
              radius={i === activeTestIndex ? 0.35 : 0.25}
              active={step >= 1}
              pulsate={i === activeTestIndex}
            />
          ))}

          {/* Pentagon edges */}
          {step >= 1 && edges.map(([a, b], i) => (
            <ConnectionBeam
              key={i}
              start={positions[a]}
              end={positions[b]}
              color={deutschTests[a].color}
              active
            />
          ))}

          {/* Central orb at step 6+ */}
          {step >= 6 && (
            <GlowSphere
              position={[0, 0, 0]}
              color="#ffffff"
              label="Good Explanation"
              sublabel="Passes all 5 tests"
              radius={0.4}
              active
              pulsate
            />
          )}
        </group>
      </SceneContainer>

      {/* 2D Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Title — top center */}
        <div className="pt-[5vh] px-12 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <h2 className="font-editorial text-xl text-muted-foreground italic mb-2">Act II</h2>
            <h1 className="font-display tracking-tight text-4xl md:text-6xl font-extrabold text-metallic">
              Epistemology as a Loss Function
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-body mt-3 max-w-lg mx-auto">
              5 independent tests — the epistemological equivalent of cross-validation
            </p>
          </motion.div>
        </div>

        {/* Step 1: Intro card — bottom center */}
        {step === 1 && (
          <motion.div
            className="absolute bottom-[14vh] left-0 right-0 flex justify-center px-8 pointer-events-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <GlassCard className="max-w-lg px-7 py-5">
              <p className="text-base font-body text-foreground/80 leading-relaxed">
                David Deutsch's framework from{' '}
                <span className="text-foreground italic">The Beginning of Infinity</span>{' '}
                gives us <span className="text-lime font-bold">5 independent validators</span>.
                Each catches a specific failure mode.
              </p>
            </GlassCard>
          </motion.div>
        )}

        {/* Steps 2-6: Test descriptions — RIGHT side */}
        {step >= 2 && step <= 6 && activeTestIndex >= 0 && activeTestIndex < 5 && (
          <motion.div
            key={activeTestIndex}
            className="absolute right-10 top-[28vh] max-w-[440px] pointer-events-auto"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlassCard className="px-7 py-6">
              <h3 className="font-display tracking-tight text-2xl font-bold mb-1"
                style={{ color: deutschTests[activeTestIndex].color, textShadow: `0 0 15px ${deutschTests[activeTestIndex].color}40` }}>
                {deutschTests[activeTestIndex].name}
              </h3>
              <p className="text-base font-body text-cyan mb-4">
                ≈ {deutschTests[activeTestIndex].mlAnalogy}
              </p>
              <div className="space-y-3 font-body text-base text-foreground/90">
                <p>→ {deutschTests[activeTestIndex].description}</p>
                <div className="mt-3 p-3 rounded bg-lime/5 border border-lime/15">
                  <span className="text-lime text-sm font-bold">✓ Pass:</span>
                  <p className="text-sm text-foreground/70 mt-1">{deutschTests[activeTestIndex].passExample}</p>
                </div>
                <div className="p-3 rounded bg-red-500/5 border border-red-500/15">
                  <span className="text-red-400 text-sm font-bold">✗ Fail:</span>
                  <p className="text-sm text-foreground/70 mt-1">{deutschTests[activeTestIndex].failExample}</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  )
}
