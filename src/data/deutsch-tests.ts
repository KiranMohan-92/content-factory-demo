export interface DeutschTest {
  name: string
  mlAnalogy: string
  description: string
  catches: string
  passExample: string
  failExample: string
  color: string
}

export const deutschTests: DeutschTest[] = [
  {
    name: 'Hard-to-Vary',
    mlAnalogy: 'Sensitivity Analysis',
    description: "Can't change details without losing explanatory power",
    catches: 'Ad-hoc explanations (change params → model breaks)',
    passExample: "Earth's 23.5° tilt causes seasons — change the angle, wrong seasons",
    failExample: '"Seasons happen because gods want variety" — swap gods for spirits, still works',
    color: '#ccff00',
  },
  {
    name: 'Mechanism',
    mlAnalogy: 'Interpretability',
    description: 'Explains HOW via causal chain, not just WHAT',
    catches: '"Just-so" stories with no causal account',
    passExample: 'Natural selection: variation → differential survival → adaptation',
    failExample: '"Zebras have stripes to confuse predators" — no mechanism specified',
    color: '#00b8b8',
  },
  {
    name: 'Reach',
    mlAnalogy: 'Generalization (OOD)',
    description: 'Explains more than it was originally designed to',
    catches: 'Narrow explanations (only explains training data)',
    passExample: "Newton's gravity: designed for orbits, also explains tides, pendulums, projectiles",
    failExample: 'Astrology: designed for personality, explains nothing else',
    color: '#9933ff',
  },
  {
    name: 'Rejectability',
    mlAnalogy: 'Falsifiability',
    description: 'Can clearly state what would prove it wrong',
    catches: "Unfalsifiable claims (can't define failure conditions)",
    passExample: '"Drug X cures Y" → testable with controlled trial',
    failExample: '"The universe is fine-tuned because we observe it" — circular, untestable',
    color: '#f59e0b',
  },
  {
    name: 'Integration',
    mlAnalogy: 'Consistency',
    description: 'Compatible with other known good explanations',
    catches: 'Isolated models (contradicts established knowledge)',
    passExample: 'Quantum mechanics integrates with chemistry, solid-state physics, computing',
    failExample: 'Homeopathy contradicts chemistry, physics, and biology',
    color: '#ec4899',
  },
]
