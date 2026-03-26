export const gapData = {
  internal: { score: 9.4, scorer: 'Editor Agent v2.0', label: 'Training Set' },
  external: { score: 6.5, scorer: 'Independent Fact-Check', label: 'Test Set' },
  gap: 2.9,
  date: 'February 2, 2026',
  errors: [
    {
      type: 'Founder attribution',
      before: '"Peter Steinberger launched Moltbook"',
      after: '"Matt Schlicht launched Moltbook"',
      category: 'Factual',
    },
    {
      type: 'Unverifiable numbers',
      before: '"150,000 agents within 48 hours"',
      after: '"rapidly grew to hundreds of thousands"',
      category: 'Precision',
    },
    {
      type: 'Absolute claims',
      before: '"without a single line of human programming"',
      after: '"with minimal hand-coding claimed"',
      category: 'Accuracy',
    },
    {
      type: 'Testability',
      before: 'Explanation just labels phenomenon',
      after: 'Added 5 discriminating predictions',
      category: 'Falsifiability',
    },
    {
      type: 'Overconfident timeline',
      before: '"you have 6-24 months"',
      after: '"window may be shorter than comfortable"',
      category: 'Certainty',
    },
  ],
  whatCaught: [
    'Framework traceability',
    'Exploratory tone',
    'Practical utility',
    'Counterarguments (2-3)',
    'Structure and flow',
  ],
  whatMissed: [
    'Founder attribution wrong',
    '"150,000 in 48 hours" unverifiable',
    '"without human programming" false',
    'Core explanation unfalsifiable',
    'Overconfident timelines',
  ],
}
