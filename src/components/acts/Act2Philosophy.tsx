import { motion } from 'framer-motion'
import { usePresentation } from '../../stores/presentation'
import { SceneContainer } from '../three/SceneContainer'
import { GlowSphere } from '../three/GlowSphere'
import { ConnectionBeam } from '../three/ConnectionBeam'
import { ParticleField } from '../three/ParticleField'
import { GridFloor } from '../three/GridFloor'
import { GlassCard } from '../shared/GlassCard'
import { deutschTests } from '../../data/deutsch-tests'
import { fadeUp, scaleIn } from '../../lib/animations'

// Pentagon positions in 3D
const PENTAGON_RADIUS = 2.5
const pentagonPositions: [number, number, number][] = Array.from({ length: 5 }, (_, i) => {
  const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2
  return [Math.cos(angle) * PENTAGON_RADIUS, Math.sin(angle) * PENTAGON_RADIUS, 0]
})

// Pentagon edges
const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
]

export function Act2Philosophy() {
  const step = usePresentation(s => s.currentStep)

  return (
    <div className="w-full h-full relative">
      {/* 3D Scene */}
      <SceneContainer>
        <ParticleField count={80} color="#00b8b8" />
        <GridFloor />

        {/* Pentagon of test spheres */}
        {deutschTests.map((test, i) => (
          <GlowSphere
            key={test.name}
            position={pentagonPositions[i]}
            color={test.color}
            label={step >= i + 2 ? test.name : ''}
            sublabel={step >= i + 2 ? test.mlAnalogy : ''}
            radius={0.25}
            active={step >= i + 2}
            pulsate={step >= i + 2}
          />
        ))}

        {/* Pentagon edges */}
        {edges.map(([a, b], i) => (
          <ConnectionBeam
            key={i}
            start={pentagonPositions[a]}
            end={pentagonPositions[b]}
            color={deutschTests[a].color}
            active={step >= Math.max(a, b) + 2}
          />
        ))}

        {/* Central "Good Explanation" orb */}
        {step >= 6 && (
          <GlowSphere
            position={[0, 0, 0]}
            color="#ffffff"
            label="Good Explanation"
            radius={0.4}
            active
            pulsate
          />
        )}
      </SceneContainer>

      {/* 2D Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none px-8">
        {/* Title */}
        <div className="flex flex-col items-center pt-12">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center">
            <h2 className="font-editorial text-lg text-muted-foreground italic mb-2">Act II</h2>
            <h1 className="font-display text-4xl md:text-6xl font-bold gradient-text">
              Epistemology as a Loss Function
            </h1>
            <p className="text-muted-foreground font-body text-sm mt-3 max-w-md mx-auto">
              5 independent tests — the epistemological equivalent of cross-validation
            </p>
          </motion.div>
        </div>

        {/* Step 1: Intro card */}
        {step >= 1 && (
          <motion.div
            className="absolute bottom-24 left-8 right-8 flex justify-center pointer-events-auto"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <GlassCard className="max-w-lg p-4">
              <p className="text-xs font-body text-muted-foreground">
                David Deutsch's framework from <span className="text-foreground italic">The Beginning of Infinity</span> gives us{' '}
                <span className="text-lime font-bold">5 independent validators</span>. Each catches a specific failure mode.
                If an explanation passes all 5, it survives criticism from every angle.
              </p>
            </GlassCard>
          </motion.div>
        )}

        {/* Steps 2-6: Test cards (bottom-left) */}
        {deutschTests.map((test, i) => (
          step === i + 2 && (
            <motion.div
              key={test.name}
              className="absolute bottom-24 left-8 right-8 flex justify-center pointer-events-auto"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <GlassCard className="max-w-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-3 h-3 rounded-full mt-1 flex-shrink-0" style={{ background: test.color }} />
                  <div>
                    <h3 className="font-display text-lg font-bold" style={{ color: test.color }}>
                      {test.name}
                      <span className="text-muted-foreground text-sm font-body ml-3">≈ {test.mlAnalogy}</span>
                    </h3>
                    <p className="text-xs font-body text-foreground/80 mt-1">{test.description}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-[10px] font-body">
                      <div className="bg-lime/5 border border-lime/20 rounded p-2">
                        <div className="text-lime mb-1">✓ Pass</div>
                        <div className="text-foreground/70">{test.passExample}</div>
                      </div>
                      <div className="bg-red-500/5 border border-red-500/20 rounded p-2">
                        <div className="text-red-400 mb-1">✗ Fail</div>
                        <div className="text-foreground/70">{test.failExample}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )
        ))}
      </div>
    </div>
  )
}
