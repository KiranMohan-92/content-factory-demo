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

// Pentagon positions
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
      {/* 3D Scene with OrbitControls */}
      <SceneContainer>
        <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.5} />
        <ParticleField count={60} color="#ccff00" spread={20} />
        <GridFloor />

        {/* Pipeline (right side) */}
        <PipelineTrack points={DEFAULT_POINTS} color="#ccff00" active progress={1} />
        {pipelinePhases.map((phase, i) => (
          <GlowSphere
            key={phase.id}
            position={DEFAULT_POINTS[i]}
            color={phase.color}
            label={phase.label}
            radius={0.2}
            active
          />
        ))}

        {/* Pentagon (left side) */}
        {deutschTests.map((test, i) => (
          <GlowSphere
            key={test.name}
            position={pentPositions[i]}
            color={test.color}
            label={test.name}
            radius={0.18}
            active
          />
        ))}
        {pentEdges.map(([a, b], i) => (
          <ConnectionBeam key={i} start={pentPositions[a]} end={pentPositions[b]} color="#00b8b8" active />
        ))}
      </SceneContainer>

      {/* 2D Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none px-6">
        {/* Title */}
        <div className="flex flex-col items-center pt-8">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="text-center">
            <h2 className="font-editorial text-lg text-muted-foreground italic mb-2">Act V</h2>
            <h1 className="font-display text-4xl md:text-5xl font-bold gradient-text">
              Explore
            </h1>
            <p className="text-muted-foreground font-body text-xs mt-2">
              Orbit the 3D scene with your mouse. Click tabs to dive deeper.
            </p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 flex gap-2 pointer-events-auto">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'px-3 py-1.5 rounded text-xs font-body border transition-all',
                tab === t
                  ? 'border-lime/40 bg-lime/10 text-lime'
                  : 'border-border text-muted-foreground hover:border-muted-foreground/40'
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div
          className="absolute bottom-20 left-6 right-6 flex justify-center pointer-events-auto"
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {tab === 'Pipeline' && (
            <GlassCard className="max-w-2xl p-4 w-full">
              <h3 className="text-xs font-body text-lime uppercase tracking-wider mb-3">5-Agent Pipeline</h3>
              <div className="grid grid-cols-5 gap-2">
                {pipelinePhases.map((phase, i) => (
                  <div key={phase.id} className="text-center">
                    <div className="w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center text-xs font-bold"
                      style={{ background: phase.color + '20', color: phase.color, border: `1px solid ${phase.color}40` }}>
                      {i + 1}
                    </div>
                    <div className="text-[9px] font-display font-bold" style={{ color: phase.color }}>{phase.label}</div>
                    <div className="text-[8px] text-muted-foreground mt-0.5 leading-tight">{phase.description.slice(0, 50)}...</div>
                    {phase.gate && (
                      <div className="text-[8px] text-muted-foreground mt-1">Gate: {phase.gate.threshold}</div>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {tab === 'Philosophy' && (
            <GlassCard className="max-w-2xl p-4 w-full">
              <h3 className="text-xs font-body text-cyan uppercase tracking-wider mb-3">5 Deutsch Tests ↔ ML Concepts</h3>
              <div className="space-y-2">
                {deutschTests.map(test => (
                  <div key={test.name} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: test.color }} />
                    <span className="text-xs font-display w-28" style={{ color: test.color }}>{test.name}</span>
                    <span className="text-muted-foreground text-[10px]">≈</span>
                    <span className="text-xs font-body text-cyan w-32">{test.mlAnalogy}</span>
                    <span className="text-[9px] text-muted-foreground flex-1">{test.catches}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {tab === 'Scores' && (
            <GlassCard className="max-w-md p-4 w-full">
              <h3 className="text-xs font-body text-lime uppercase tracking-wider mb-3">
                Real Scores: {missionTeamsArticle.title.slice(0, 40)}...
              </h3>
              <div className="space-y-2">
                {missionTeamsArticle.dimensions.map((dim, i) => (
                  <DimensionBar
                    key={dim.name}
                    name={dim.name}
                    score={dim.score}
                    weight={dim.weight}
                    delay={i * 0.05}
                  />
                ))}
              </div>
              <div className="mt-3 pt-2 border-t border-border flex justify-between text-xs font-body">
                <span className="text-muted-foreground">Overall</span>
                <span className="text-lime font-bold">{missionTeamsArticle.overallScore}/10</span>
              </div>
            </GlassCard>
          )}

          {tab === 'System' && (
            <GlassCard className="max-w-2xl p-4 w-full">
              <h3 className="text-xs font-body text-purple uppercase tracking-wider mb-3">Why This Architecture is Hard-to-Vary</h3>
              <div className="grid grid-cols-2 gap-3 text-[10px] font-body">
                <div className="bg-lime/5 border border-lime/10 rounded p-2">
                  <div className="text-lime font-bold mb-1">Why Sequential?</div>
                  <div className="text-foreground/70">Can't analyze before researching. Can't edit before writing. Each agent criticizes completed work.</div>
                </div>
                <div className="bg-cyan/5 border border-cyan/10 rounded p-2">
                  <div className="text-cyan font-bold mb-1">Why Specialized?</div>
                  <div className="text-foreground/70">Combined roles create blind spots. You know what you meant, so you don't see where it's unclear.</div>
                </div>
                <div className="bg-purple/5 border border-purple/10 rounded p-2">
                  <div className="text-purple font-bold mb-1">Why Dual Gates?</div>
                  <div className="text-foreground/70">Editor catches surface issues. CODEX catches deep issues. The 0.2-point gap is where world-class lives.</div>
                </div>
                <div className="bg-orange/5 border border-orange/10 rounded p-2">
                  <div className="text-orange font-bold mb-1">Why Can't Skip?</div>
                  <div className="text-foreground/70">Skipping research → bias. Skipping analysis → no insight. Skipping CODEX → 2.9-point gap returns.</div>
                </div>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </div>
    </div>
  )
}
