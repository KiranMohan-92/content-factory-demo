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

// Floating score orbs in a circle — sized by weight
const orbPositions: [number, number, number][] = missionTeamsArticle.dimensions.map((_, i) => {
  const angle = (i * 2 * Math.PI) / missionTeamsArticle.dimensions.length - Math.PI / 2
  return [Math.cos(angle) * 3, Math.sin(angle) * 2, -1]
})

const SUBSTACK_URL = 'https://knowledgearchitect.substack.com/'

export function Act4Proof() {
  const step = usePresentation(s => s.currentStep)

  return (
    <div className="w-full h-full relative">
      {/* 3D Scene: floating score orbs */}
      <SceneContainer>
        <ParticleField count={50} color="#ccff00" />
        <GridFloor />

        {/* Central score orb — centered, not too high */}
        <GlowSphere
          position={[0, 0, 0]}
          color="#ccff00"
          label={step >= 1 ? '9.43' : ''}
          sublabel={step >= 1 ? 'Overall Score' : ''}
          radius={0.5}
          active={step >= 1}
          pulsate
        />

        {/* 7 dimension orbs in a circle */}
        {step >= 1 && missionTeamsArticle.dimensions.map((dim, i) => {
          const color = dim.score >= 9.5 ? '#ccff00' : dim.score >= 9.0 ? '#00b8b8' : '#f59e0b'
          const size = 0.15 + dim.weight * 0.8  // Bigger orb for higher weight
          return (
            <GlowSphere
              key={dim.name}
              position={orbPositions[i]}
              color={color}
              label={dim.name.split(' ')[0]}
              sublabel={dim.score.toFixed(1)}
              radius={size}
              active
              pulsate={false}
            />
          )
        })}
      </SceneContainer>

      {/* 2D Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">

        {/* Title — top center */}
        <div className="pt-[5vh] px-12 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <h2 className="font-editorial text-xl text-muted-foreground italic mb-2">Act IV</h2>
            <h1 className="font-display tracking-tight text-4xl md:text-6xl font-extrabold text-metallic">
              Real Output, Real Scores
            </h1>
            <p className="text-base text-foreground/60 font-body mt-3 max-w-2xl mx-auto">
              "{missionTeamsArticle.title}"
            </p>
          </motion.div>
        </div>

        {/* Score gauges — centered below title */}
        {step >= 0 && (
          <motion.div
            className="absolute top-[20vh] left-1/2 -translate-x-1/2 flex gap-8"
            variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
          >
            <ScoreGauge score={9.43} label="Editor" threshold={9.3} size={120} active={step >= 1} />
            <ScoreGauge score={9.5} label="CODEX" threshold={9.5} size={120} active={step >= 1} />
          </motion.div>
        )}

        {/* Dimension bars — left side */}
        {step >= 1 && (
          <motion.div
            className="absolute left-10 top-[22vh] w-[300px] space-y-3"
            variants={fadeUp} initial="hidden" animate="visible"
          >
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
          </motion.div>
        )}

        {/* Article excerpt with link */}
        {step >= 2 && step < 3 && (
          <motion.div
            className="absolute bottom-[13vh] left-0 right-0 flex justify-center px-8 pointer-events-auto"
            variants={fadeUp} initial="hidden" animate="visible"
          >
            <GlassCard className="max-w-2xl px-8 py-6 w-full">
              <h3 className="text-base font-body text-lime uppercase tracking-wider mb-3 glow-lime">Article Opening</h3>
              <p className="text-lg md:text-xl font-editorial italic text-foreground/85 leading-relaxed">
                "{missionTeamsArticle.excerpt}"
              </p>
              <a
                href={SUBSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-base font-body text-lime hover:text-lime/80 transition-colors underline underline-offset-4"
              >
                Read the full article on Substack →
              </a>
            </GlassCard>
          </motion.div>
        )}

        {/* Counterarguments */}
        {step >= 3 && (
          <motion.div
            className="absolute bottom-[13vh] left-0 right-0 flex justify-center px-8 pointer-events-auto"
            variants={fadeUp} initial="hidden" animate="visible"
          >
            <GlassCard glow="cyan" className="max-w-2xl px-8 py-6 w-full">
              <h3 className="text-base font-body text-cyan uppercase tracking-wider mb-4 glow-lime" style={{ textShadow: '0 0 10px rgba(0,184,184,0.3)' }}>
                3 Steelmanned Counterarguments
              </h3>
              <div className="space-y-4">
                {missionTeamsArticle.counterarguments.map((ca, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                  >
                    <span className="text-cyan text-lg font-bold font-display flex-shrink-0">{i + 1}.</span>
                    <div>
                      <p className="text-base font-body text-foreground/90">"{ca.objection}"</p>
                      <p className="text-sm font-body text-muted-foreground mt-1">{ca.quality}</p>
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
