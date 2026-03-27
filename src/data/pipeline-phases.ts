export interface PipelinePhase {
  id: string
  label: string
  agent: string
  description: string
  output: string
  color: string
  icon: string
  gate?: { threshold: number; label: string }
}

export const pipelinePhases: PipelinePhase[] = [
  {
    id: 'research',
    label: 'Research',
    agent: 'Researcher Agent v2.0',
    description: 'Documents 3-7 competing explanations with evidence for/against. Steelmans each view.',
    output: 'research.md',
    color: '#ccff00',
    icon: 'Search',
  },
  {
    id: 'analysis',
    label: 'Analysis',
    agent: 'Analyzer Agent v2.0',
    description: 'Applies 5 Deutsch tests to each explanation. Identifies the good explanation.',
    output: 'analysis.md',
    color: '#00b8b8',
    icon: 'Brain',
  },
  {
    id: 'writing',
    label: 'Writing',
    agent: 'Writer Agent v2.0',
    description: 'Converts analysis to accessible content with traceability, counterarguments, practical utility.',
    output: 'drafts/*.md',
    color: '#9933ff',
    icon: 'PenTool',
  },
  {
    id: 'editing',
    label: 'Editing',
    agent: 'Editor Agent v2.0',
    description: '7-pass systematic review across 7 quality dimensions. Minimum 9.5/10 to proceed.',
    output: 'editor-feedback.md',
    color: '#f59e0b',
    icon: 'Edit3',
    gate: { threshold: 9.5, label: 'Editor Gate' },
  },
  {
    id: 'codex',
    label: 'CODEX Review',
    agent: 'CODEX Brutal Critic v2.2',
    description: 'Hostile cross-examination. Stress-tests claims, searches counterexamples. 9.3/10 minimum.',
    output: 'codex-feedback.md',
    color: '#ec4899',
    icon: 'Shield',
    gate: { threshold: 9.3, label: 'CODEX Gate' },
  },
]

export const mlAnalogies = [
  { ml: 'Train / Test Split', cf: 'Editor (9.3) vs CODEX (9.5)' },
  { ml: 'Ensemble Methods', cf: '5 specialized agents > 1 general agent' },
  { ml: 'Loss Function', cf: 'Hard-to-vary criterion' },
  { ml: 'Feature Importance', cf: '7 weighted quality dimensions' },
  { ml: 'Ablation Study', cf: 'Remove any agent → specific errors uncaught' },
  { ml: 'Regularization', cf: 'CODEX prevents overconfident claims' },
]
