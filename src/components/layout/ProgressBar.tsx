import { usePresentation } from '../../stores/presentation'
import { cn } from '../../lib/utils'

const ACT_LABELS = ['The Problem', 'Philosophy', 'Architecture', 'The Proof', 'Explore']

export function ProgressBar() {
  const { currentAct, goToAct } = usePresentation()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-3 py-3 px-6 bg-gradient-to-t from-black/80 to-transparent">
      {ACT_LABELS.map((label, i) => {
        const act = i + 1
        const isActive = currentAct === act
        const isPast = currentAct > act
        return (
          <button
            key={act}
            onClick={() => goToAct(act)}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-body transition-all duration-300 border',
              isActive
                ? 'border-lime/40 bg-lime/10 text-lime'
                : isPast
                  ? 'border-lime/20 bg-lime/5 text-lime/60'
                  : 'border-border bg-transparent text-muted-foreground hover:border-muted-foreground/40'
            )}
          >
            <span className={cn(
              'w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold',
              isActive ? 'bg-lime text-black' : isPast ? 'bg-lime/20 text-lime' : 'bg-muted text-muted-foreground'
            )}>
              {act}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
