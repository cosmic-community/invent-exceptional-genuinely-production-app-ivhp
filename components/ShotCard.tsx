import { Shot } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function ShotCard({ shot, index }: { shot: Shot; index: number }) {
  const shotNumberRaw = getMetafieldValue(shot.metadata?.shot_number)
  const shotNumber = shotNumberRaw ? Number(shotNumberRaw) : index + 1
  const startTime = getMetafieldValue(shot.metadata?.start_time)
  const duration = getMetafieldValue(shot.metadata?.duration)
  const camera = getMetafieldValue(shot.metadata?.camera)
  const visualDescription = getMetafieldValue(shot.metadata?.visual_description)
  const onscreenText = getMetafieldValue(shot.metadata?.onscreen_text)
  const voiceover = getMetafieldValue(shot.metadata?.voiceover)
  const soundDesign = getMetafieldValue(shot.metadata?.sound_design)
  const frame = shot.metadata?.frame_reference

  return (
    <div className="relative grid grid-cols-1 gap-6 rounded-2xl border border-white/5 bg-ink-light/50 p-6 md:grid-cols-[56px_1fr] md:gap-8 md:p-8">
      <div className="flex items-start gap-4 md:block">
        <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-amber/40 bg-ink font-serif text-lg text-amber">
          {String(shotNumber).padStart(2, '0')}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_1.4fr]">
        {frame ? (
          <img
            src={`${frame.imgix_url}?w=700&h=420&fit=crop&auto=format,compress`}
            alt={`Shot ${shotNumber} frame reference`}
            className="aspect-video w-full rounded-xl object-cover md:aspect-[4/3]"
          />
        ) : (
          <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-white/10 bg-ink-lighter font-sans text-xs uppercase tracking-[0.2em] text-mist-dim md:aspect-[4/3]">
            No frame reference
          </div>
        )}

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-mist-dim">
            {startTime && (
              <span className="rounded-full border border-white/10 px-3 py-1 text-amber">
                {startTime}
              </span>
            )}
            {duration && <span>{duration}</span>}
            {camera && <span className="text-teal-light">{camera}</span>}
          </div>

          {visualDescription && (
            <p className="font-sans text-sm leading-relaxed text-mist">{visualDescription}</p>
          )}

          {onscreenText && (
            <p className="font-serif text-lg italic text-mist">“{onscreenText}”</p>
          )}

          {voiceover && (
            <div className="border-l-2 border-amber/40 pl-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-amber">
                Voiceover
              </p>
              <p className="mt-1 font-sans text-sm text-mist-dim">{voiceover}</p>
            </div>
          )}

          {soundDesign && (
            <div className="border-l-2 border-teal-light/40 pl-4">
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-teal-light">
                Sound Design
              </p>
              <p className="mt-1 font-sans text-sm text-mist-dim">{soundDesign}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}