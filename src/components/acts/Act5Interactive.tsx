import { useState } from 'react'
import { motion } from 'framer-motion'
import { SceneContainer } from '../three/SceneContainer'
import { GlowSphere } from '../three/GlowSphere'
import { PipelineTrack, DEFAULT_POINTS } from '../three/PipelineTrack'
import { ConnectionBeam } from '../three/ConnectionBeam'
import { ParticleField } from '../three/ParticleField'
import { GridFloor } from '../three/GridFloor'
import { GlassCard } from '../shared/GlassCard'
import { pipelinePhases } from '../../data/pipeline-phases'
import { deutschTests } from '../../data/deutsch-tests'
import { agentDetails, outputFormats, versionTimeline } from '../../data/article-scores'
import { cn } from '../../lib/utils'
import { OrbitControls } from '@react-three/drei'

const TABS = ['Agents', 'Formats', 'Timeline'] as const
type Tab = (typeof TABS)[number]

const PENTAGON_R = 2
const pentPositions: [number, number, number][] = Array.from({ length: 5 }, (_, i) => {
  const a = (i * 2 * Math.PI) / 5 - Math.PI / 2
  return [Math.cos(a) * PENTAGON_R - 2, Math.sin(a) * PENTAGON_R, 0]
})
const pentEdges: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,0]]

export function Act5Interactive() {
  const [tab, setTab] = useState<Tab>('Agents')

  return (
    <div className="w-full h-full relative">
      {/* 3D — constrained to LEFT 55% of viewport */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '55%', height: '100%' }}>
        <SceneContainer>
          <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.5} />
          <ParticleField count={60} color="#ccff00" spread={15} />
          <GridFloor />
          <PipelineTrack points={DEFAULT_POINTS} color="#ccff00" active progress={1} />
          {pipelinePhases.map((phase, i) => (
            <GlowSphere key={phase.id} position={DEFAULT_POINTS[i]} color={phase.color} label={phase.label} radius={0.2} active />
          ))}
          {deutschTests.map((test, i) => (
            <GlowSphere key={test.name} position={pentPositions[i]} color={test.color} label={test.name} radius={0.18} active />
          ))}
          {pentEdges.map(([a, b], i) => (
            <ConnectionBeam key={i} start={pentPositions[a]} end={pentPositions[b]} color="#4DD9D0" active />
          ))}
        </SceneContainer>
      </div>

      {/* 2D Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">

        {/* Title — top left */}
        <div className="pt-[3vh] md:pt-[4vh] px-6 md:px-12 text-center md:text-left md:max-w-[45vw]">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-editorial text-xl md:text-2xl text-muted-foreground italic mb-1">Act V</h2>
            <h1 className="font-display tracking-tight text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#EDF1FF]">
              Explore
            </h1>
          </motion.div>
        </div>

        {/* Tabs — RIGHT side, below title */}
        <div className="absolute top-[4vh] md:top-[5vh] right-6 md:right-[4vw] flex gap-2 md:gap-3 pointer-events-auto">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={cn(
                'px-5 md:px-7 py-2 md:py-3 rounded-lg text-base md:text-lg font-body border transition-all duration-300',
                tab === t
                  ? 'border-lime/30 bg-lime/8 text-lime glow-box-lime'
                  : 'border-white/5 text-muted-foreground hover:border-white/10 hover:text-[#EDF1FF]/80'
              )}>
              {t}
            </button>
          ))}
        </div>

        {/* Orbit hint — bottom left */}
        <div className="absolute bottom-[10vh] left-6 md:left-8 text-xs font-body text-muted-foreground/25 pointer-events-none">
          Drag to orbit · Scroll to zoom
        </div>

        {/* Tab content — RIGHT half of screen */}
        <motion.div
          className="absolute top-[14vh] md:top-[16vh] bottom-[10vh] right-4 md:right-[3vw] w-[92vw] md:w-[44vw] flex items-start pointer-events-auto"
          key={tab}
          initial={{ opacity: 0, x: 20, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {tab === 'Agents' && (
            <GlassCard className="w-full px-6 md:px-8 py-5 md:py-6">
              <h3 className="text-base md:text-lg font-body text-lime uppercase tracking-wider mb-4 glow-lime">
                Agent Details & Orchestrator
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {(['researcher', 'analyzer', 'writer', 'editor', 'codex', 'orchestrator'] as const).map(key => {
                  const agent = agentDetails[key]
                  const color = key === 'researcher' ? '#ccff00' : key === 'analyzer' ? '#4DD9D0' : key === 'writer' ? '#9933ff' : key === 'editor' ? '#f59e0b' : key === 'codex' ? '#ec4899' : '#EDF1FF'
                  return (
                    <div key={key} className="glass-card p-3 md:p-4 !bg-[rgba(2,4,10,0.94)]" style={{ borderColor: `${color}15` }}>
                      <h4 className="font-display tracking-tight text-sm md:text-base font-bold mb-2" style={{ color }}>
                        {agent.name}
                      </h4>
                      {'bullets' in agent ? (
                        <div className="space-y-1">
                          {agent.bullets.slice(0, 3).map((b, i) => (
                            <p key={i} className="text-xs md:text-sm text-[#EDF1FF]/70 leading-snug">→ {b}</p>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {agent.flow.slice(0, 4).map((f, i) => (
                            <p key={i} className="text-xs md:text-sm text-[#EDF1FF]/70 leading-snug">
                              <span className="text-lime">{f.phase}</span> → {f.desc}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </GlassCard>
          )}

          {tab === 'Formats' && (
            <GlassCard className="w-full px-6 md:px-8 py-5 md:py-6">
              <h3 className="text-base md:text-lg font-body text-cyan uppercase tracking-wider mb-4"
                style={{ textShadow: '0 0 15px rgba(77,217,208,0.3)' }}>
                6 Output Formats Per Topic
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                {outputFormats.map(fmt => (
                  <div key={fmt.name} className="glass-card p-3 md:p-4 !bg-[rgba(2,4,10,0.94)]" style={{ borderColor: `${fmt.color}15` }}>
                    <h4 className="font-display tracking-tight text-sm md:text-base font-bold mb-1" style={{ color: fmt.color }}>
                      {fmt.name}
                    </h4>
                    <div className="text-xs text-muted-foreground mb-2 font-mono">{fmt.length}</div>
                    <p className="text-xs md:text-sm text-[#EDF1FF]/70 leading-snug">{fmt.desc}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {tab === 'Timeline' && (
            <GlassCard className="w-full px-6 md:px-8 py-5 md:py-6">
              <h3 className="text-base md:text-lg font-body text-purple uppercase tracking-wider mb-4"
                style={{ textShadow: '0 0 15px rgba(153,51,255,0.3)' }}>
                Version Evolution
              </h3>
              <div className="space-y-4">
                {versionTimeline.map((v, i) => (
                  <div key={v.version} className="flex gap-4 items-start">
                    {/* Timeline dot + line */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full" style={{ background: v.color, boxShadow: `0 0 12px ${v.color}50` }} />
                      {i < versionTimeline.length - 1 && <div className="w-px h-12 bg-white/10 mt-1" />}
                    </div>
                    {/* Content */}
                    <div className="pb-2">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-mono text-sm md:text-base font-bold" style={{ color: v.color }}>{v.version}</span>
                        <span className="text-xs text-muted-foreground">{v.date}</span>
                      </div>
                      <h4 className="font-display tracking-tight text-base md:text-lg font-bold text-[#EDF1FF] mb-1">{v.title}</h4>
                      <p className="text-sm text-[#EDF1FF]/70">{v.desc}</p>
                      <p className="text-xs text-muted-foreground mt-1 italic">Problem solved: {v.problem}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </motion.div>
      </div>
    </div>
  )
}
