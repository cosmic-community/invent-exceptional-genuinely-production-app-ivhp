import { Shot } from '@/types'
import ShotCard from '@/components/ShotCard'
import Reveal from '@/components/Reveal'

export default function ShotTimeline({ shots }: { shots: Shot[] }) {
  if (!shots || shots.length === 0) {
    return (
      <p className="font-sans text-mist-dim">No shots have been added to this film yet.</p>
    )
  }

  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[27px] top-0 hidden w-px bg-gradient-to-b from-amber/40 via-teal-light/30 to-transparent md:block" />
      <div className="space-y-10">
        {shots.map((shot, index) => (
          <Reveal key={shot.id} delay={index * 90}>
            <ShotCard shot={shot} index={index} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}