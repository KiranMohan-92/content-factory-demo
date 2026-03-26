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
      {/* 3D Scene */}
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

      {/* 2D Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">

        {/* Title — compact */}
        <div className="pt-[4vh] px-12 text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
            <h2 className="font-editorial text-xl text-muted-foreground italic mb-2">Act V</h2>
            <h1 className="font-display tracking-tight text-4xl md:text-6xl font-extrabold text-metallic">
              Explore
            </h1>
          </motion.div>
        </div>

        {/* Tabs — clear gap below title */}
        <div className="absolute top-[15vh] left-1/2 -translate-x-1/2 flex gap-3 pointer-events-auto">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'px-6 py-2.5 rounded-lg text-base font-body border transition-all',
                tab === t
                  ? 'border-lime/40 bg-lime/10 text-lime glow-box-lime'
                  : 'border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground/80'
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Orbit hint — bottom-right, subtle */}
        <div className="absolute bottom-[12vh] right-8 text-xs font-body text-muted-foreground/30 pointer-events-none">
          Drag to orbit · Scroll to zoom
        </div>

        {/* Tab content — bottom area */}
        <motion.div
          className="absolute bottom-[15vh] left-8 right-8 flex justify-center pointer-events-auto"
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tab === 'Pipeline' && (
            <GlassCard className="max-w-3xl px-8 py-6 w-full">
              <h3 className="text-base font-body text-lime uppercase tracking-wider mb-4 glow-lime">5-Agent Pipeline</h3>
              <div className="grid grid-cols-5 gap-5">
                {pipelinePhases.map((phase, i) => (
                  <div key={phase.id} className="text-center">
                    <div className="w-11 h-11 rounded-full mx-auto mb-2 flex items-center justify-center text-base font-bold font-display"
                      style={{ background: phase.color + '20', color: phase.color, border: `1px solid ${phase.color}40`, boxShadow: `0 0 10px ${phase.color}15` }}>
                      {i + 1}
                    </div>
                    <div className="text-sm font-display font-bold tracking-tight" style={{ color: phase.color }}>{phase.label}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-snug">{phase.description.slice(0, 55)}...</div>
                    {phase.gate && (
                      <div className="text-xs text-foreground/50 mt-1 font-bold">≥{phase.gate.threshold}</div>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {tab === 'Philosophy' && (
            <GlassCard className="max-w-3xl px-8 py-6 w-full">
              <h3 className="text-base font-body text-cyan uppercase tracking-wider mb-4" style={{ textShadow: '0 0 10px rgba(0,184,184,0.3)' }}>5 Deutsch Tests ↔ ML Concepts</h3>
              <div className="space-y-3">
                {deutschTests.map(test => (
                  <div key={test.name} className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: test.color, boxShadow: `0 0 8px ${test.color}40` }} />
                    <span className="text-sm font-display font-bold tracking-tight w-32" style={{ color: test.color }}>{test.name}</span>
                    <span className="text-muted-foreground text-sm">≈</span>
                    <span className="text-sm font-body text-cyan w-40">{test.mlAnalogy}</span>
                    <span className="text-sm text-muted-foreground flex-1">{test.catches}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {tab === 'Scores' && (
            <GlassCard className="max-w-lg px-8 py-6 w-full">
              <h3 className="text-base font-body text-lime uppercase tracking-wider mb-4 glow-lime">
                Real Scores: {missionTeamsArticle.title.slice(0, 42)}...
              </h3>
              <div className="space-y-3">
                {missionTeamsArticle.dimensions.map((dim, i) => (
                  <DimensionBar key={dim.name} name={dim.name} score={dim.score} weight={dim.weight} delay={i * 0.05} />
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border flex justify-between text-base font-body">
                <span className="text-muted-foreground">Overall</span>
                <span className="text-lime font-bold text-xl">{missionTeamsArticle.overallScore}/10</span>
              </div>
            </GlassCard>
          )}

          {tab === 'System' && (
            <GlassCard className="max-w-3xl px-8 py-6 w-full">
              <h3 className="text-base font-body text-purple uppercase tracking-wider mb-4" style={{ textShadow: '0 0 10px rgba(153,51,255,0.3)' }}>
                Why This Architecture is Hard-to-Vary
              </h3>
              <div className="grid grid-cols-2 gap-5 text-base font-body">
                <div className="bg-lime/5 border border-lime/10 rounded-lg p-5">
                  <div className="text-lime font-bold font-display tracking-tight text-lg mb-2">Why Sequential?</div>
                  <div className="text-foreground/70 leading-relaxed">Can't analyze before researching. Can't edit before writing. Each agent criticizes completed work.</div>
                </div>
                <div className="bg-cyan/5 border border-cyan/10 rounded-lg p-5">
                  <div className="text-cyan font-bold font-display tracking-tight text-lg mb-2">Why Specialized?</div>
                  <div className="text-foreground/70 leading-relaxed">Combined roles create blind spots. You know what you meant, so you don't see where it's unclear.</div>
                </div>
                <div className="bg-purple/5 border border-purple/10 rounded-lg p-5">
                  <div className="text-purple font-bold font-display tracking-tight text-lg mb-2">Why Dual Gates?</div>
                  <div className="text-foreground/70 leading-relaxed">Editor catches surface issues. CODEX catches deep issues. The 0.2-point gap is where world-class lives.</div>
                </div>
                <div className="bg-orange/5 border border-orange/10 rounded-lg p-5">
                  <div className="text-orange font-bold font-display tracking-tight text-lg mb-2">Why Can't Skip?</div>
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
