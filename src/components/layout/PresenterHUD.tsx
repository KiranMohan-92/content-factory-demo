import { usePresentation } from '../../stores/presentation'

export function PresenterHUD() {
  const { currentAct, currentStep, getMaxSteps } = usePresentation()

  return (
    <div className="fixed top-4 right-4 z-50 glass-card px-3 py-2 text-[10px] font-body text-muted-foreground flex items-center gap-3 opacity-40 hover:opacity-100 transition-opacity">
      <span>Act <span className="text-lime font-bold">{currentAct}</span>/5</span>
      <span className="text-border">|</span>
      <span>Step <span className="text-cyan font-bold">{currentStep + 1}</span>/{getMaxSteps()}</span>
      <span className="text-border">|</span>
      <span className="text-muted-foreground/60">← → navigate · F fullscreen</span>
    </div>
  )
}
