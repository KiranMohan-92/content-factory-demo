import { motion, AnimatePresence } from 'framer-motion'
import { usePresentation } from '../../stores/presentation'
import { SceneContainer } from '../three/SceneContainer'
import { ParticleField } from '../three/ParticleField'
import { GridFloor } from '../three/GridFloor'
import { GlassCard } from '../shared/GlassCard'
import { ScoreGauge } from '../shared/ScoreGauge'
import { DimensionBar } from '../shared/DimensionBar'
import { publishedArticle } from '../../data/article-scores'

export function Act4Proof() {
  const step = usePresentation(s => s.currentStep)

  return (
    <div className="w-full h-full relative">
      {/* 3D ambient particles — full background */}
      <SceneContainer>
        <ParticleField count={40} color="#ccff00" />
        <GridFloor />
      </SceneContainer>

      <div className="absolute inset-0 z-10 pointer-events-none">

        {/* Title — top center */}
        <div className="pt-[3vh] md:pt-[4vh] px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-editorial text-xl md:text-2xl text-muted-foreground italic mb-2">Act IV</h2>
            <h1 className="font-display tracking-tight text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#EDF1FF]">
              Real Output, Real Scores
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-body mt-2 max-w-2xl mx-auto">
              "{publishedArticle.title}"
            </p>
            <a href={publishedArticle.substackUrl} target="_blank" rel="noopener noreferrer"
              className="inline-block mt-2 text-sm md:text-base font-body text-lime hover:text-lime/80 transition-colors underline underline-offset-4 pointer-events-auto">
              Read on Substack →
            </a>
          </motion.div>
        </div>

        {/* LEFT side — Score gauges + dimension bars */}
        {step >= 1 && (
          <motion.div
            className="absolute left-4 md:left-[4vw] top-[22vh] w-[92vw] md:w-[42vw] pointer-events-auto"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="px-6 md:px-8 py-5 md:py-6">
              {/* Gauges row */}
              <div className="flex justify-center gap-6 md:gap-10 mb-6">
                <ScoreGauge score={9.5} label="Editor" threshold={9.5} size={110} active />
                <ScoreGauge score={9.3} label="CODEX" threshold={9.3} size={110} active />
              </div>
              {/* Dimension bars */}
              <div className="space-y-2.5">
                {publishedArticle.dimensions.map((dim, i) => (
                  <DimensionBar key={dim.name} name={dim.name} score={dim.score} weight={dim.weight} delay={i * 0.08} active />
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* RIGHT side — Counterarguments */}
        <div className="absolute top-[22vh] right-4 md:right-[3vw] w-[92vw] md:w-[44vw] pointer-events-auto">
          <AnimatePresence mode="wait">
            {step === 2 && (
              <motion.div key="counter"
                initial={{ opacity: 0, x: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -15, filter: 'blur(4px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                <GlassCard glow="cyan" className="px-6 md:px-8 py-5 md:py-6">
                  <h3 className="text-base md:text-lg font-body text-cyan uppercase tracking-wider mb-4"
                    style={{ textShadow: '0 0 15px rgba(77,217,208,0.3)' }}>
                    3 Steelmanned Counterarguments
                  </h3>
                  <div className="space-y-4">
                    {publishedArticle.counterarguments.map((ca, i) => (
                      <motion.div key={i} className="flex gap-3"
                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }}>
                        <span className="text-cyan text-lg md:text-xl font-bold font-display flex-shrink-0">{i + 1}.</span>
                        <div>
                          <p className="text-base md:text-lg font-body text-[#EDF1FF]/90">"{ca.objection}"</p>
                          <p className="text-sm md:text-base font-body text-muted-foreground mt-1">{ca.quality}</p>
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
