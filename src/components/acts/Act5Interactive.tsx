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
import { agentDetails } from '../../data/article-scores'
import { cn } from '../../lib/utils'
import { OrbitControls } from '@react-three/drei'

const TABS = ['Agents', 'Philosophy', 'System'] as const
type Tab = (typeof TABS)[number]

const PENTAGON_R = 2
const pentPositions: [number, number, number][] = Array.from({ length: 5 }, (_, i) => {
  const a = (i * 2 * Math.PI) / 5 - Math.PI / 2
  return [Math.cos(a) * PENTAGON_R - 4, Math.sin(a) * PENTAGON_R, 0]
})
const pentEdges: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,0]]

export function Act5Interactive() {
  const [tab, setTab] = useState<Tab>('Agents')

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
          <ConnectionBeam key={i} start={pentPositions[a]} end={pentPositions[b]} color="#4DD9D0" active />
        ))}
      </SceneContainer>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="pt-[3vh] md:pt-[4vh] px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, filter: 'blur(12px)', y: 15 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-editorial text-xl md:text-2xl text-muted-foreground italic mb-1">Act V</h2>
            <h1 className="font-display tracking-tight text-4xl md:text-6xl lg:text-7xl font-extrabold text-metallic">
              Explore
            </h1>
          </motion.div>
        </div>

        <div className="absolute top-[12vh] md:top-[14vh] left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 pointer-events-auto">
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

        <div className="absolute bottom-[10vh] right-6 md:right-8 text-xs font-body text-muted-foreground/25 pointer-events-none">
          Drag to orbit · Scroll to zoom
        </div>

        <motion.div
          className="absolute bottom-[12vh] md:bottom-[14vh] left-4 right-4 md:left-8 md:right-8 flex justify-center pointer-events-auto"
          key={tab} initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>

          {tab === 'Agents' && (
            <GlassCard className="max-w-[95vw] md:max-w-4xl px-6 md:px-8 py-5 md:py-6 w-full">
              <h3 className="text-base md:text-lg font-body text-lime uppercase tracking-wider mb-4 glow-lime">
                Agent Details & Orchestrator
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                {(['researcher', 'analyzer', 'writer', 'editor', 'codex', 'orchestrator'] as const).map(key => {
                  const agent = agentDetails[key]
                  const color = key === 'researcher' ? '#ccff00' : key === 'analyzer' ? '#4DD9D0' : key === 'writer' ? '#9933ff' : key === 'editor' ? '#f59e0b' : key === 'codex' ? '#ec4899' : '#EDF1FF'
                  return (
                    <div key={key} className="glass-card p-3 md:p-4 !bg-[rgba(2,4,10,0.88)]" style={{ borderColor: `${color}15` }}>
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

          {tab === 'Philosophy' && (
            <GlassCard className="max-w-[95vw] md:max-w-3xl px-6 md:px-8 py-5 md:py-6 w-full">
              <h3 className="text-base md:text-lg font-body text-cyan uppercase tracking-wider mb-4"
                style={{ textShadow: '0 0 15px rgba(77,217,208,0.3)' }}>
                5 Deutsch Tests ↔ ML Concepts
              </h3>
              <div className="space-y-3 md:space-y-4">
                {deutschTests.map(test => (
                  <div key={test.name} className="flex items-center gap-3 md:gap-4">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: test.color, boxShadow: `0 0 10px ${test.color}40` }} />
                    <span className="text-sm md:text-base font-display font-bold tracking-tight w-28 md:w-36" style={{ color: test.color }}>{test.name}</span>
                    <span className="text-muted-foreground text-sm md:text-base hidden md:inline">≈</span>
                    <span className="text-sm md:text-base font-body text-cyan w-32 md:w-44">{test.mlAnalogy}</span>
                    <span className="text-xs md:text-sm text-muted-foreground flex-1 hidden lg:inline">{test.catches}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {tab === 'System' && (
            <GlassCard className="max-w-[95vw] md:max-w-3xl px-6 md:px-8 py-5 md:py-6 w-full">
              <h3 className="text-base md:text-lg font-body text-purple uppercase tracking-wider mb-4"
                style={{ textShadow: '0 0 15px rgba(153,51,255,0.3)' }}>
                Why This Architecture is Hard-to-Vary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5 text-base md:text-lg font-body">
                <div className="glass-card !bg-[rgba(2,4,10,0.88)] border-lime/8 p-4 md:p-5">
                  <div className="text-lime font-bold font-display tracking-tight text-lg md:text-xl mb-2">Why Sequential?</div>
                  <div className="text-[#EDF1FF]/70 leading-relaxed text-sm md:text-base">Can't analyze before researching. Can't edit before writing. Each agent criticizes completed work.</div>
                </div>
                <div className="glass-card !bg-[rgba(2,4,10,0.88)] border-cyan/8 p-4 md:p-5">
                  <div className="text-cyan font-bold font-display tracking-tight text-lg md:text-xl mb-2">Why Specialized?</div>
                  <div className="text-[#EDF1FF]/70 leading-relaxed text-sm md:text-base">Combined roles create blind spots. You know what you meant, so you don't see where it's unclear.</div>
                </div>
                <div className="glass-card !bg-[rgba(2,4,10,0.88)] border-purple/8 p-4 md:p-5">
                  <div className="text-purple font-bold font-display tracking-tight text-lg md:text-xl mb-2">Why Dual Gates?</div>
                  <div className="text-[#EDF1FF]/70 leading-relaxed text-sm md:text-base">Editor catches surface issues. CODEX catches deep issues. The 0.2-point gap is where world-class lives.</div>
                </div>
                <div className="glass-card !bg-[rgba(2,4,10,0.88)] border-orange/8 p-4 md:p-5">
                  <div className="text-orange font-bold font-display tracking-tight text-lg md:text-xl mb-2">Why Can't Skip?</div>
                  <div className="text-[#EDF1FF]/70 leading-relaxed text-sm md:text-base">Skipping research → bias. Skipping analysis → no insight. Skipping CODEX → 2.9-point gap returns.</div>
                </div>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </div>
    </div>
  )
}
