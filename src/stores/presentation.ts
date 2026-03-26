import { create } from 'zustand'

const ACT_STEPS: Record<number, number> = {
  1: 4,  // Problem: title, counter, table, callout
  2: 7,  // Philosophy: intro, test1-5, summary
  3: 7,  // Architecture: title, research, analysis, writing, editor, codex, publish-ready
  4: 3,  // Proof: title, scores+orbs, counterarguments
  5: 1,  // Explore: free interaction
}

interface PresentationState {
  currentAct: number
  currentStep: number
  isAnimating: boolean
  totalActs: number
  getMaxSteps: () => number
  nextStep: () => void
  prevStep: () => void
  nextAct: () => void
  prevAct: () => void
  goToAct: (act: number) => void
  setAnimating: (v: boolean) => void
}

export const usePresentation = create<PresentationState>((set, get) => ({
  currentAct: 1,
  currentStep: 0,
  isAnimating: false,
  totalActs: 5,

  getMaxSteps: () => ACT_STEPS[get().currentAct] ?? 1,

  nextStep: () => {
    const { currentStep, currentAct, totalActs, isAnimating } = get()
    if (isAnimating) return
    const max = ACT_STEPS[currentAct] ?? 1
    if (currentStep < max - 1) {
      set({ currentStep: currentStep + 1 })
    } else if (currentAct < totalActs) {
      set({ currentAct: currentAct + 1, currentStep: 0 })
    }
  },

  prevStep: () => {
    const { currentStep, currentAct, isAnimating } = get()
    if (isAnimating) return
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1 })
    } else if (currentAct > 1) {
      const prevAct = currentAct - 1
      set({ currentAct: prevAct, currentStep: (ACT_STEPS[prevAct] ?? 1) - 1 })
    }
  },

  nextAct: () => {
    const { currentAct, totalActs, isAnimating } = get()
    if (isAnimating || currentAct >= totalActs) return
    set({ currentAct: currentAct + 1, currentStep: 0 })
  },

  prevAct: () => {
    const { currentAct, isAnimating } = get()
    if (isAnimating || currentAct <= 1) return
    set({ currentAct: currentAct - 1, currentStep: 0 })
  },

  goToAct: (act: number) => {
    if (act >= 1 && act <= 5) {
      set({ currentAct: act, currentStep: 0 })
    }
  },

  setAnimating: (v: boolean) => set({ isAnimating: v }),
}))
