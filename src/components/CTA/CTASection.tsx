import { Button } from '@/components/Buttons/Button';
import { Reveal } from '@/components/Motion/Reveal';

type Props = { title?: string; body?: string; primary?: [string, string]; secondary?: [string, string] };

/** Closing call-to-action. Dark panel with a single restrained gradient rule
 *  and a faint engineering grid. */
export function CTASection({
  title = 'Have an Idea Worth Building?',
  body = 'Let’s turn your next business challenge into a digital solution.',
  primary = ['Start a Project', '/contact'],
  secondary = ['Discuss Your Requirements', '/contact?topic=requirements'],
}: Props) {
  return (
    <section className="container py-20 lg:py-28" aria-labelledby="cta-title">
      <Reveal className="relative overflow-hidden rounded-[28px] bg-ink px-6 py-16 text-white sm:px-12 lg:px-16 lg:py-24">
        <div className="grid-paper-dark fade-mask-b absolute inset-0" aria-hidden />
        <div
          className="absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full opacity-[0.22] blur-3xl"
          style={{ background: 'radial-gradient(circle, #10B981, #06B6D4 50%, transparent 70%)' }}
          aria-hidden
        />
        <div className="relative grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <div className="mb-8 h-[3px] w-14 rounded-full bg-brand-gradient" aria-hidden />
            <h2 id="cta-title" className="h-section text-balance text-white">{title}</h2>
            <p className="mt-5 max-w-xl text-lg text-white/60">{body}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
            <Button to={primary[1]} variant="gradient" size="lg" arrow>{primary[0]}</Button>
            <Button to={secondary[1]} variant="ghost-dark" size="lg">{secondary[0]}</Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
