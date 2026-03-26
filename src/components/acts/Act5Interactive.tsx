import { useState } from 'react'
import { motion } from 'framer-motion'
import { SceneContainer } from '../three/SceneContainer'
import { GlowSphere } from '../three/GlowSphere'
import { PipelineTrack, DEFAULT_POINTS } from '../three/PipelineTrack'
import { ConnectionBeam } from '../three/ConnectionBeam'
import { ParticleField } from '../three/ParticleField'
import { GridFloor } from '../three/GridFloor'
import { GlassCard } from '../shared/GlassCard'
import { DimensionBar } from '../shared/DimensionBar'
import { pipelinePhases } from '../../data/pipeline-phases'
import { deutschTests } from '../../data/deutsch-tests'
import { missionTeamsArticle } from '../../data/article-scores'
import { fadeUp } from '../../lib/animations'
import { cn } from '../../lib/utils'
import { OrbitControls } from '@react-three/drei'

const TABS = ['Pipeline', 'Philosophy', 'Scores', 'System'] as const
type Tab = (typeof TABS)[number]

const PENTAGON_R = 2
const pentPositions: [number, number, number][] = Array.from({ length: 5 }, (_, i) => {
  const a = (i * 2 * Math.PI) / 5 - Math.PI / 2
  return [Math.cos(a) * PENTAGON_R - 4, Math.sin(a) * PENTAGON_R, 0]
})
const pentEdges: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,0]]

export function Act5Interactive() {
  const [tab, setTab] = useState<Tab>('Pipeline')

  return (
    <div className="w-full h-full relative">
      <SceneContainer>
        <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.5} />
        <ParticleField count={60} color="#ccff00" spread={20} />
        <GridFloor />
        <PipelineTrack points={DEFAULT_POINTS} color="#ccff00" active progress={1} />
        {pipelinePhases.map((phase, i) => (
          <GlowSphere key={phase.id} position={DEFAULT_POINTS[i]} color={phase.color} label={phase.label} radius={0.2} active />
        ))}
        {deutschTests.map((test, i) => (
          <GlowSphere key={test.name} position={pentPositions[i]} color={test.color} label={test.name} radius={0.18} active />
        ))}
        {pentEdges.map(([a, b], i) => (
          <ConnectionBeam key={i} start={pentPositions[a]} end={pentPositions[b]} color="#00b8b8" active />
        ))}
      </SceneContainer>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pt-[3vh] md:pt-[4vh] px-6 md:px-12 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <h2 className="font-editorial text-lg md:text-xl text-muted-foreground italic mb-1">Act V</h2>
            <h1 className="font-display tracking-tight text-3xl md:text-5xl lg:text-6xl font-extrabold text-metallic">
              Explore
            </h1>
          </motion.div>
        </div>

        <div className="absolute top-[12vh] md:top-[14vh] left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 pointer-events-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn(
                'px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-sm md:text-base font-body border transition-all',
                tab === t
                  ? 'border-lime/40 bg-lime/10 text-lime glow-box-lime'
                  : 'border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground/80'
              )}>
              {t}
            </button>
          ))}
        </div>

        <div className="absolute bottom-[10vh] right-6 md:right-8 text-[10px] md:text-xs font-body text-muted-foreground/25 pointer-events-none">
          Drag to orbit · Scroll to zoom
        </div>

        <motion.div
          className="absolute bottom-[12vh] md:bottom-[14vh] left-4 right-4 md:left-8 md:right-8 flex justify-center pointer-events-auto"
          key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>

          {tab === 'Pipeline' && (
            <GlassCard className="max-w-[95vw] md:max-w-3xl px-5 md:px-8 py-5 md:py-6 w-full">
              <h3 className="text-sm md:text-base font-body text-lime uppercase tracking-wider mb-3 md:mb-4 glow-lime">5-Agent Pipeline</h3>
              <div className="grid grid-cols-5 gap-2 md:gap-5">
                {pipelinePhases.map((phase, i) => (
                  <div key={phase.id} className="text-center">
                    <div className="w-8 h-8 md:w-11 md:h-11 rounded-full mx-auto mb-1 md:mb-2 flex items-center justify-center text-xs md:text-base font-bold font-display"
                      style={{ background: phase.color + '20', color: phase.color, border: `1px solid ${phase.color}40`, boxShadow: `0 0 10px ${phase.color}15` }}>
                      {i + 1}
                    </div>
                    <div className="text-xs md:text-sm font-display font-bold tracking-tight" style={{ color: phase.color }}>{phase.label}</div>
                    <div className="text-[10px] md:text-xs text-muted-foreground mt-1 leading-snug hidden md:block">{phase.description.slice(0, 55)}...</div>
                    {phase.gate && <div className="text-[10px] md:text-xs text-foreground/50 mt-1 font-bold">≥{phase.gate.threshold}</div>}
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {tab === 'Philosophy' && (
            <GlassCard className="max-w-[95vw] md:max-w-3xl px-5 md:px-8 py-5 md:py-6 w-full">
              <h3 className="text-sm md:text-base font-body text-cyan uppercase tracking-wider mb-3 md:mb-4" style={{ textShadow: '0 0 10px rgba(0,184,184,0.3)' }}>5 Deutsch Tests ↔ ML Concepts</h3>
              <div className="space-y-2 md:space-y-3">
                {deutschTests.map(test => (
                  <div key={test.name} className="flex items-center gap-2 md:gap-4">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full flex-shrink-0" style={{ background: test.color, boxShadow: `0 0 8px ${test.color}40` }} />
                    <span className="text-xs md:text-sm font-display font-bold tracking-tight w-24 md:w-32" style={{ color: test.color }}>{test.name}</span>
                    <span className="text-muted-foreground text-xs md:text-sm hidden md:inline">≈</span>
                    <span className="text-xs md:text-sm font-body text-cyan w-28 md:w-40">{test.mlAnalogy}</span>
                    <span className="text-xs text-muted-foreground flex-1 hidden lg:inline">{test.catches}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {tab === 'Scores' && (
            <GlassCard className="max-w-[90vw] md:max-w-lg px-5 md:px-8 py-5 md:py-6 w-full">
              <h3 className="text-sm md:text-base font-body text-lime uppercase tracking-wider mb-3 md:mb-4 glow-lime">
                Real Scores
              </h3>
              <div className="space-y-2 md:space-y-3">
                {missionTeamsArticle.dimensions.map((dim, i) => (
                  <DimensionBar key={dim.name} name={dim.name} score={dim.score} weight={dim.weight} delay={i * 0.05} />
                ))}
              </div>
              <div className="mt-3 md:mt-4 pt-2 md:pt-3 border-t border-border flex justify-between text-sm md:text-base font-body">
                <span className="text-muted-foreground">Overall</span>
                <span className="text-lime font-bold text-lg md:text-xl">{missionTeamsArticle.overallScore}/10</span>
              </div>
            </GlassCard>
          )}

          {tab === 'System' && (
            <GlassCard className="max-w-[95vw] md:max-w-3xl px-5 md:px-8 py-5 md:py-6 w-full">
              <h3 className="text-sm md:text-base font-body text-purple uppercase tracking-wider mb-3 md:mb-4" style={{ textShadow: '0 0 10px rgba(153,51,255,0.3)' }}>
                Why This Architecture is Hard-to-Vary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 text-sm md:text-base font-body">
                <div className="glass-card bg-lime/5 border-lime/10 p-4 md:p-5">
                  <div className="text-lime font-bold font-display tracking-tight text-base md:text-lg mb-2 text-shine">Why Sequential?</div>
                  <div className="text-foreground/70 leading-relaxed">Can't analyze before researching. Can't edit before writing. Each agent criticizes completed work.</div>
                </div>
                <div className="glass-card bg-cyan/5 border-cyan/10 p-4 md:p-5">
                  <div className="text-cyan font-bold font-display tracking-tight text-base md:text-lg mb-2 text-shine">Why Specialized?</div>
                  <div className="text-foreground/70 leading-relaxed">Combined roles create blind spots. You know what you meant, so you don't see where it's unclear.</div>
                </div>
                <div className="glass-card bg-purple/5 border-purple/10 p-4 md:p-5">
                  <div className="text-purple font-bold font-display tracking-tight text-base md:text-lg mb-2 text-shine">Why Dual Gates?</div>
                  <div className="text-foreground/70 leading-relaxed">Editor catches surface issues. CODEX catches deep issues. The 0.2-point gap is where world-class lives.</div>
                </div>
                <div className="glass-card bg-orange/5 border-orange/10 p-4 md:p-5">
                  <div className="text-orange font-bold font-display tracking-tight text-base md:text-lg mb-2 text-shine">Why Can't Skip?</div>
                  <div className="text-foreground/70 leading-relaxed">Skipping research → bias. Skipping analysis → no insight. Skipping CODEX → 2.9-point gap returns.</div>
                </div>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </div>
    </div>
  )
}
