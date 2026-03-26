import { motion } from 'framer-motion'
import { usePresentation } from '../../stores/presentation'
import { SceneContainer } from '../three/SceneContainer'
import { GlowSphere } from '../three/GlowSphere'
import { ParticleField } from '../three/ParticleField'
import { GridFloor } from '../three/GridFloor'
import { GlassCard } from '../shared/GlassCard'
import { ScoreGauge } from '../shared/ScoreGauge'
import { DimensionBar } from '../shared/DimensionBar'
import { missionTeamsArticle } from '../../data/article-scores'
import { fadeUp } from '../../lib/animations'

// 3D column positions in a semicircle
const columnPositions: [number, number, number][] = missionTeamsArticle.dimensions.map((_, i) => {
  const angle = (Math.PI * 0.8) * (i / (missionTeamsArticle.dimensions.length - 1)) - Math.PI * 0.4
  return [Math.cos(angle) * 3.5, -1.5, Math.sin(angle) * 2 - 1]
})

export function Act4Proof() {
  const step = usePresentation(s => s.currentStep)

  return (
    <div className="w-full h-full relative">
      {/* 3D Scene: column chart */}
      <SceneContainer>
        <ParticleField count={60} color="#ccff00" />
        <GridFloor />

        {/* Score columns */}
        {step >= 1 && missionTeamsArticle.dimensions.map((dim, i) => {
          const height = (dim.score / 10) * 3
          const color = dim.score >= 9.5 ? '#ccff00' : dim.score >= 9.0 ? '#00b8b8' : '#f59e0b'
          return (
            <group key={dim.name} position={columnPositions[i]}>
              <mesh position={[0, height / 2, 0]}>
                <boxGeometry args={[0.25 + dim.weight * 1.5, height, 0.25 + dim.weight * 1.5]} />
                <meshStandardMaterial
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.5}
                  transparent
                  opacity={0.7}
                />
              </mesh>
            </group>
          )
        })}

        {/* Threshold planes */}
        {step >= 1 && (
          <>
            {/* 9.3 threshold */}
            <mesh position={[0, (9.3 / 10) * 3 - 1.5, 0]} rotation={[0, 0, 0]}>
              <planeGeometry args={[10, 0.005]} />
              <meshBasicMaterial color="#ccff00" transparent opacity={0.15} side={2} />
            </mesh>
            {/* 9.5 threshold */}
            <mesh position={[0, (9.5 / 10) * 3 - 1.5, 0]} rotation={[0, 0, 0]}>
              <planeGeometry args={[10, 0.005]} />
              <meshBasicMaterial color="#00b8b8" transparent opacity={0.15} side={2} />
            </mesh>
          </>
        )}

        {/* Central score orb */}
        {step >= 0 && (
          <GlowSphere
            position={[0, 1.5, 0]}
            color="#ccff00"
            label={step >= 1 ? '9.43/10' : ''}
            sublabel="Overall Score"
            radius={0.4}
            active={step >= 1}
          />
        )}
      </SceneContainer>

      {/* 2D Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none px-8">
        {/* Title */}
        <div className="flex flex-col items-center pt-8">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center">
            <h2 className="font-editorial text-lg text-muted-foreground italic mb-2">Act IV</h2>
            <h1 className="font-display text-4xl md:text-5xl font-bold gradient-text">
              Real Output, Real Scores
            </h1>
            <p className="text-muted-foreground font-body text-xs mt-2 max-w-md mx-auto">
              "{missionTeamsArticle.title}"
            </p>
          </motion.div>
        </div>

        {/* Score gauges */}
        {step >= 0 && (
          <motion.div
            className="absolute top-32 right-6 flex gap-4"
            variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
          >
            <ScoreGauge score={9.43} label="Editor" threshold={9.3} size={100} active={step >= 1} />
            <ScoreGauge score={9.5} label="CODEX" threshold={9.5} size={100} active={step >= 1} />
          </motion.div>
        )}

        {/* Dimension bars (left side) */}
        {step >= 1 && (
          <div className="absolute left-6 top-32 w-[280px] space-y-2 pointer-events-auto">
            {missionTeamsArticle.dimensions.map((dim, i) => (
              <DimensionBar
                key={dim.name}
                name={dim.name}
                score={dim.score}
                weight={dim.weight}
                delay={i * 0.08}
                active={step >= 1}
              />
            ))}
          </div>
        )}

        {/* Excerpt */}
        {step >= 2 && (
          <motion.div
            className="absolute bottom-32 left-0 right-0 flex justify-center pointer-events-auto"
            variants={fadeUp} initial="hidden" animate="visible"
          >
            <GlassCard className="max-w-2xl p-4">
              <h3 className="text-[10px] font-body text-lime uppercase tracking-wider mb-2">Article Opening</h3>
              <p className="text-xs font-editorial italic text-foreground/80 leading-relaxed">
                "{missionTeamsArticle.excerpt}"
              </p>
            </GlassCard>
          </motion.div>
        )}

        {/* Counterarguments */}
        {step >= 3 && (
          <motion.div
            className="absolute bottom-32 left-0 right-0 flex justify-center pointer-events-auto"
            variants={fadeUp} initial="hidden" animate="visible"
          >
            <GlassCard glow="cyan" className="max-w-2xl p-4">
              <h3 className="text-[10px] font-body text-cyan uppercase tracking-wider mb-2">
                3 Steelmanned Counterarguments
              </h3>
              <div className="space-y-2">
                {missionTeamsArticle.counterarguments.map((ca, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <span className="text-cyan text-xs flex-shrink-0">{i + 1}.</span>
                    <div>
                      <p className="text-xs font-body text-foreground/90">"{ca.objection}"</p>
                      <p className="text-[9px] font-body text-muted-foreground mt-0.5">{ca.quality}</p>
                    </div>
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
