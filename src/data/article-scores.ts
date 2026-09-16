export const publishedArticle = {
  title: 'The Articulation Engineering: How to Explain Complex Thoughts',
  substackUrl: 'https://kiranrocksbigtime.substack.com/p/the-articulation-engineering-how',
  overallScore: 9.43,
  reviewDate: '2026-03-15',
  dimensions: [
    { name: 'Philosophical Accuracy', score: 9.2, weight: 0.15, pass: 'Framework applied rigorously. Compression-as-understanding maps to hard-to-vary.' },
    { name: 'Factual Accuracy', score: 9.5, weight: 0.10, pass: 'Information theory grounded. Shannon entropy referenced correctly.' },
    { name: 'Logical Soundness', score: 9.7, weight: 0.15, pass: 'Airtight causal chain. 3 steelmanned counterarguments addressed.' },
    { name: 'Clarity & Accessibility', score: 9.4, weight: 0.15, pass: 'Complex ideas grounded with concrete examples before abstract principles.' },
    { name: 'Engagement & Writing', score: 8.9, weight: 0.15, pass: 'Strong hook, authentic voice. Exploratory tone throughout.' },
    { name: 'Practical Utility', score: 9.6, weight: 0.20, pass: '5-step workflow, concrete examples, actionable within 24 hours.' },
    { name: 'Intellectual Honesty', score: 9.8, weight: 0.10, pass: 'Limitations acknowledged. Falsification criteria provided.' },
  ],
  counterarguments: [
    { objection: 'Some knowledge is inherently tacit and cannot be articulated', quality: 'Steelmanned with Polanyi — then shown that compression strategies still apply to the articulable portion' },
    { objection: 'Simplification always loses critical nuance', quality: 'Distinguished lossy vs lossless compression — good explanations compress without information loss' },
    { objection: 'Expertise speaks for itself — articulation is optional', quality: 'Addressed with evidence that unexplained expertise creates organizational single points of failure' },
  ],
}

export const agentDetails = {
  researcher: {
    name: 'Researcher Agent v2.0',
    bullets: [
      'Documents 5-7 competing explanations before evaluation',
      'Steelmans every view — advocates would recognize their position',
      'Maps evidence for AND against each explanation',
      'Identifies gaps, contradictions, shared assumptions',
    ],
  },
  analyzer: {
    name: 'Analyzer Agent v2.0',
    bullets: [
      'Applies 5 independent Deutsch tests to each explanation',
      'Hard-to-Vary: can you swap components?',
      'Mechanism: does it explain HOW, not just WHAT?',
      'Reach: explains more than originally intended?',
      'Rejectability: what would prove it wrong?',
      'Integration: connects to other known good explanations?',
    ],
  },
  writer: {
    name: 'Writer Agent v2.0',
    bullets: [
      'Every claim traces back to analysis — full traceability',
      '3-5 specific examples with names, numbers, scenarios',
      '2-3 steelmanned counterarguments addressed substantively',
      'Zero vague advice — all actionable within 24 hours',
      'Exploratory tone, never preachy or robotic',
    ],
  },
  editor: {
    name: 'Editor Agent v2.0',
    sevenPasses: [
      { pass: 'Philosophical Accuracy', weight: '15%' },
      { pass: 'Factual Accuracy', weight: '10%' },
      { pass: 'Logical Soundness', weight: '15%' },
      { pass: 'Clarity & Accessibility', weight: '15%' },
      { pass: 'Engagement & Writing', weight: '15%' },
      { pass: 'Practical Utility', weight: '20%' },
      { pass: 'Intellectual Honesty', weight: '10%' },
    ],
    bullets: [
      'Seven-pass systematic review — seven distinct error types',
      'Each dimension scored independently — minimum 8.5 each',
      'Overall minimum 9.3/10 to qualify for CODEX review',
      'Highest weight (20%) on Practical Utility',
    ],
  },
  codex: {
    name: 'CODEX Brutal Critic v2.2',
    bullets: [
      'Final gatekeeper — hostile cross-examination via OpenAI codex CLI',
      'Stress-tests every claim, searches for counterexamples',
      'Verifies evidence forensically — no overreach tolerated',
      'Minimum 9.5/10 — higher than Editor\'s 9.3 threshold',
      'Maximum 3 revision iterations, then escalates to human',
    ],
  },
  orchestrator: {
    name: 'Pipeline Orchestrator',
    flow: [
      { phase: 'Setup', desc: 'Create brief, directories, execution log' },
      { phase: 'Research', desc: 'Spawn Researcher → research.md' },
      { phase: 'Analysis', desc: 'Spawn Analyzer → analysis.md' },
      { phase: 'Writing', desc: 'Check context, spawn Writer → drafts' },
      { phase: 'Verification', desc: 'Verify entities, numbers, claims' },
      { phase: 'Editing', desc: 'Editor gate: ≥9.3 or retry once' },
      { phase: 'CODEX', desc: 'Brutal critic gate: ≥9.5 or 3 retries' },
      { phase: 'Publication', desc: 'Move to /final/, update context' },
    ],
  },
}

export const outputFormats = [
  { name: 'Article', length: '2,000–4,000 words', color: '#ccff00', desc: 'Deep-dive with hook, landscape, good explanation, counterarguments, practical steps' },
  { name: 'X Thread', length: '8–15 tweets', color: '#4DD9D0', desc: 'Standalone tweets with numbered progression, specific examples, call to action' },
  { name: 'LinkedIn Post', length: '300–600 words', color: '#9933ff', desc: 'Professional frame with workplace story, insight, 1-2 examples, hashtags' },
  { name: 'Newsletter', length: '800–1,200 words', color: '#f59e0b', desc: 'Personal tone, "I discovered" framing, 2-3 examples, immediate action' },
  { name: 'YouTube Script', length: '1,500–3,000 words', color: '#ec4899', desc: 'Scene descriptions, pacing notes, visual cues, chapter markers' },
  { name: 'Podcast Notes', length: '800–1,500 words', color: '#EDF1FF', desc: 'Talking points, timestamps, discussion flow, linked resources' },
]

export const versionTimeline = [
  {
    version: 'v2.0',
    date: 'Dec 2025',
    title: 'Base Pipeline',
    desc: '5-agent sequential workflow with Editor gate at 9.5',
    problem: 'No automated quality enforcement existed',
    color: '#ccff00',
  },
  {
    version: 'v2.1',
    date: 'Jan 2026',
    title: 'External Verification',
    desc: 'Added Phase 3.5 — verify entities, numbers, claims against primary sources',
    problem: '2.9-point gap: internal scored 9.4, external scored 6.5',
    color: '#4DD9D0',
  },
  {
    version: 'v2.2',
    date: 'Feb 2026',
    title: 'CODEX Brutal Critic',
    desc: 'Hostile cross-examination via OpenAI codex CLI with 9.3 gate',
    problem: 'Editor missed deep issues — argument stress-testing, counterexamples, evidence forensics',
    color: '#ec4899',
  },
  {
    version: 'v2.3',
    date: 'Mar 2026',
    title: 'Gemini Research',
    desc: 'Dynamic prompts + web search + multi-modal sources via Gemini CLI',
    problem: 'Research phase limited to single-model knowledge without live web access',
    color: '#9933ff',
  },
]
