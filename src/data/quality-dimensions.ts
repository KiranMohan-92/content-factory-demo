export interface QualityDimension {
  name: string
  weight: number
  description: string
  minScore: number
}

export const qualityDimensions: QualityDimension[] = [
  { name: 'Hard-to-Vary', weight: 0.15, description: 'Are explanations hard to vary? Specific, falsifiable claims?', minScore: 9.0 },
  { name: 'Explanatory Depth', weight: 0.15, description: 'Does content reach for deep explanations vs surface-level?', minScore: 9.0 },
  { name: 'Clarity', weight: 0.15, description: 'Is writing clear, precise, free of jargon?', minScore: 9.0 },
  { name: 'Coherence', weight: 0.15, description: 'Does argument flow logically with no contradictions?', minScore: 9.0 },
  { name: 'Engagement', weight: 0.20, description: 'Is content compelling and practically valuable?', minScore: 9.0 },
  { name: 'Originality', weight: 0.10, description: 'Does content offer genuinely novel insights?', minScore: 9.0 },
  { name: 'Evidence-Based', weight: 0.10, description: 'Claims supported by evidence, examples, or reasoning?', minScore: 9.0 },
]
