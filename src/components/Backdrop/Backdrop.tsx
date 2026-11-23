/**
 * Page backdrop for the top of every page: pure black with a soft glow
 * at the top-right and a wide, curved beam of light sweeping across the
 * lower part of the first screen. Purely decorative and static.
 */
export function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(100vh,1000px)] min-h-[720px] overflow-hidden" aria-hidden>
      {/* Soft top-right glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 55% at 78% 8%, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.02) 45%, transparent 70%)',
        }}
      />
      {/* Faint light from the top-left corner */}
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(40% 35% at 0% 0%, rgba(255,255,255,0.035), transparent 70%)' }}
      />

      {/* Wide diffused beam */}
      <div
        className="absolute left-[-25%] top-[64%] h-[300px] w-[150%] -rotate-[7deg] blur-[38px]"
        style={{
          background:
            'radial-gradient(50% 50% at 28% 50%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 45%, transparent 75%)',
        }}
      />

      {/* Curved light edge riding on top of the beam */}
      <div
        className="absolute left-[-30%] top-[70%] h-[900px] w-[160%] -rotate-[7deg] rounded-[50%] border-t border-white/[0.11] blur-[1.5px]"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 18%, black 55%, transparent 85%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 18%, black 55%, transparent 85%)',
          boxShadow: 'inset 0 18px 40px -18px rgba(255,255,255,0.10)',
        }}
      />

      {/* Fade into the page */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}
