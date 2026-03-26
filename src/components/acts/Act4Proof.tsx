import { motion, AnimatePresence } from 'framer-motion'
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

const orbPositions: [number, number, number][] = missionTeamsArticle.dimensions.map((_, i) => {
  const angle = (i * 2 * Math.PI) / missionTeamsArticle.dimensions.length - Math.PI / 2
  return [Math.cos(angle) * 2.8, Math.sin(angle) * 1.8 - 1, -1.5]
})

const SUBSTACK_URL = 'https://knowledgearchitect.substack.com/'

export function Act4Proof() {
  const step = usePresentation(s => s.currentStep)

  return (
    <div className="w-full h-full relative">
      <SceneContainer>
        <ParticleField count={50} color="#ccff00" />
        <GridFloor />
        <GlowSphere position={[0, -0.5, 0]} color="#ccff00" label={step >= 1 ? '9.43' : ''} sublabel={step >= 1 ? 'Overall' : ''} radius={0.45} active={step >= 1} pulsate />
        {step >= 1 && missionTeamsArticle.dimensions.map((dim, i) => {
          const color = dim.score >= 9.5 ? '#ccff00' : dim.score >= 9.0 ? '#00b8b8' : '#f59e0b'
          const size = 0.12 + dim.weight * 0.7
          return (
            <GlowSphere key={dim.name} position={orbPositions[i]} color={color}
              label={dim.name.split(' ')[0]} sublabel={dim.score.toFixed(1)}
              radius={size} active pulsate={false} />
          )
        })}
      </SceneContainer>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pt-[4vh] md:pt-[5vh] px-6 md:px-12 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <h2 className="font-editorial text-lg md:text-xl text-muted-foreground italic mb-2">Act IV</h2>
            <h1 className="font-display tracking-tight text-3xl md:text-5xl lg:text-6xl font-extrabold text-metallic">
              Real Output, Real Scores
            </h1>
            <p className="text-sm md:text-base text-foreground/50 font-body mt-2 max-w-xl mx-auto">
              "{missionTeamsArticle.title}"
            </p>
          </motion.div>
        </div>

        {/* Score gauges — left side, below title */}
        {step >= 1 && (
          <motion.div className="absolute left-6 md:left-10 top-[20vh] flex flex-col md:flex-row gap-4 md:gap-6"
            variants={fadeUp} initial="hidden" animate="visible" custom={0.2}>
            <ScoreGauge score={9.43} label="Editor" threshold={9.3} size={100} active />
            <ScoreGauge score={9.5} label="CODEX" threshold={9.5} size={100} active />
          </motion.div>
        )}

        {/* Dimension bars — right side */}
        {step >= 1 && (
          <motion.div className="absolute right-6 md:right-10 top-[20vh] w-[250px] md:w-[280px] space-y-2"
            variants={fadeUp} initial="hidden" animate="visible">
            {missionTeamsArticle.dimensions.map((dim, i) => (
              <DimensionBar key={dim.name} name={dim.name} score={dim.score} weight={dim.weight} delay={i * 0.08} active />
            ))}
          </motion.div>
        )}

        {/* Bottom cards — one at a time */}
        <div className="absolute bottom-[10vh] md:bottom-[12vh] inset-x-0 flex justify-center px-4 md:px-8 pointer-events-auto">
          <AnimatePresence mode="wait">
            {step === 2 && (
              <motion.div key="excerpt" className="w-full max-w-[90vw] md:max-w-2xl"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard className="px-6 md:px-8 py-5 md:py-6">
                  <h3 className="text-sm md:text-base font-body text-lime uppercase tracking-wider mb-3 glow-lime">Article Opening</h3>
                  <p className="text-base md:text-xl font-editorial italic text-foreground/85 leading-relaxed">
                    "{missionTeamsArticle.excerpt}"
                  </p>
                  <a href={SUBSTACK_URL} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 text-sm md:text-base font-body text-lime hover:text-lime/80 transition-colors underline underline-offset-4">
                    Read the full article on Substack →
                  </a>
                </GlassCard>
              </motion.div>
            )}
            {step === 3 && (
              <motion.div key="counter" className="w-full max-w-[90vw] md:max-w-2xl"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard glow="cyan" className="px-6 md:px-8 py-5 md:py-6">
                  <h3 className="text-sm md:text-base font-body text-cyan uppercase tracking-wider mb-4" style={{ textShadow: '0 0 10px rgba(0,184,184,0.3)' }}>
                    3 Steelmanned Counterarguments
                  </h3>
                  <div className="space-y-3">
                    {missionTeamsArticle.counterarguments.map((ca, i) => (
                      <motion.div key={i} className="flex gap-3"
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.12 }}>
                        <span className="text-cyan text-base md:text-lg font-bold font-display flex-shrink-0">{i + 1}.</span>
                        <div>
                          <p className="text-sm md:text-base font-body text-foreground/90">"{ca.objection}"</p>
                          <p className="text-xs md:text-sm font-body text-muted-foreground mt-1">{ca.quality}</p>
                        </div>
                      </motion.div>
                    ))}
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
