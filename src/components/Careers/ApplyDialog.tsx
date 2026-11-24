import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, FileText, Upload, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { Position } from '@/data/careers';
import { submitApplication } from '@/services/careers';

const MAX_MB = 5;
type Errors = Partial<Record<'name' | 'email' | 'message' | 'resume' | 'portfolio', string>>;

/** Application form in a modal. Submits through services/careers.ts (backend later). */
export function ApplyDialog({
  open,
  onClose,
  positions,
  initialPosition,
}: {
  open: boolean;
  onClose: () => void;
  positions: Position[];
  initialPosition: string; // '' = general application
}) {
  const uid = useId();
  const panel = useRef<HTMLDivElement>(null);
  const [positionId, setPositionId] = useState(initialPosition);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  // Reset when opened for a (possibly different) role.
  useEffect(() => {
    if (!open) return;
    setPositionId(initialPosition);
    setResume(null);
    setErrors({});
    setState('idle');
  }, [open, initialPosition]);

  // Esc to close, lock page scroll, focus the panel.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => panel.current?.querySelector<HTMLElement>('input, select, textarea')?.focus(), 50);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      window.clearTimeout(t);
    };
  }, [open, onClose]);

  const pickFile = (f: File | undefined | null) => {
    if (!f) return;
    if (f.size > MAX_MB * 1024 * 1024) return setErrors((e) => ({ ...e, resume: `Please keep it under ${MAX_MB} MB.` }));
    if (!/\.(pdf|docx?)$/i.test(f.name)) return setErrors((e) => ({ ...e, resume: 'Please upload a PDF or Word file.' }));
    setErrors((e) => ({ ...e, resume: undefined }));
    setResume(f);
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? '').trim();
    const next: Errors = {};
    if (!v('name')) next.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) next.email = 'Please enter a valid email.';
    if (v('portfolio') && !/^https?:\/\/\S+\.\S+/.test(v('portfolio'))) next.portfolio = 'Start the link with https://';
    if (v('message').length < 20) next.message = 'Tell us a little more (at least 20 characters).';
    if (!resume) next.resume = 'Please attach your resume.';
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      panel.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setState('sending');
    await submitApplication({
      positionId,
      name: v('name'),
      email: v('email'),
      phone: v('phone') || undefined,
      portfolio: v('portfolio') || undefined,
      message: v('message'),
      resume,
    });
    setState('sent');
  };

  const role = positions.find((p) => p.id === positionId);
  const field = 'mt-2 w-full rounded-xl bg-white/[0.04] px-4 py-3 text-[15px] text-white ring-1 ring-inset ring-white/10 placeholder:text-zinc-600 focus:outline-none focus:ring-white/30';
  const label = 'text-[14px] font-medium text-zinc-300';
  const err = (k: keyof Errors) => errors[k] && <p className="mt-1.5 text-[13px] text-red-300">{errors[k]}</p>;

  if (typeof document === 'undefined') return null; // build-time render: nothing to show
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${uid}-title`}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[92vh] w-full max-w-[560px] overflow-y-auto rounded-t-3xl bg-[#0E0E10] p-6 ring-1 ring-white/10 sm:rounded-3xl sm:p-8"
          >
            <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-zinc-400 hover:bg-white/5 hover:text-white">
              <X className="h-[18px] w-[18px]" />
            </button>

            {state === 'sent' ? (
              <div className="py-8 text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-black"><Check className="h-6 w-6" /></span>
                <h2 id={`${uid}-title`} className="mt-6 font-display text-[26px] font-semibold text-white">Application received</h2>
                <p className="mx-auto mt-3 max-w-[34ch] text-[15.5px] leading-relaxed text-zinc-400">
                  Thanks for applying{role ? ` for ${role.title}` : ''}. We read every application and will reply within a week.
                </p>
                <button type="button" onClick={onClose} className="mt-8 rounded-xl bg-white px-5 py-3 text-[15px] font-medium text-black hover:bg-white/90">
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h2 id={`${uid}-title`} className="pr-10 font-display text-[26px] font-semibold text-white">
                  {role ? `Apply for ${role.title}` : 'Apply to Crista'}
                </h2>
                <p className="mt-2 text-[15px] text-zinc-400">{role ? `${role.team} · ${role.location} · ${role.type}` : 'Tell us about yourself and the work you want to do.'}</p>

                <div className="mt-7 space-y-5">
                  <label className="block">
                    <span className={label}>Role</span>
                    <select name="position" value={positionId} onChange={(e) => setPositionId(e.target.value)} className={cn(field, 'appearance-none')}>
                      {positions.map((p) => <option key={p.id} value={p.id} className="bg-[#0E0E10]">{p.title}</option>)}
                      <option value="" className="bg-[#0E0E10]">General application</option>
                    </select>
                  </label>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className={label}>Full name</span>
                      <input name="name" autoComplete="name" className={field} aria-invalid={!!errors.name} />
                      {err('name')}
                    </label>
                    <label className="block">
                      <span className={label}>Email</span>
                      <input name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} />
                      {err('email')}
                    </label>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className={label}>Phone <span className="text-zinc-600">(optional)</span></span>
                      <input name="phone" type="tel" autoComplete="tel" className={field} />
                    </label>
                    <label className="block">
                      <span className={label}>Portfolio, GitHub or LinkedIn</span>
                      <input name="portfolio" type="url" placeholder="https://" className={field} aria-invalid={!!errors.portfolio} />
                      {err('portfolio')}
                    </label>
                  </div>

                  <label className="block">
                    <span className={label}>Why Crista, and what have you built?</span>
                    <textarea name="message" rows={4} className={cn(field, 'resize-none')} aria-invalid={!!errors.message} />
                    {err('message')}
                  </label>

                  <div>
                    <span className={label}>Resume</span>
                    <label
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => { e.preventDefault(); pickFile(e.dataTransfer.files[0]); }}
                      className={cn(
                        'mt-2 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed px-4 py-4 text-[14.5px] transition-colors',
                        errors.resume ? 'border-red-300/50' : 'border-white/15 hover:border-white/30',
                      )}
                    >
                      {resume ? <FileText className="h-5 w-5 text-white" /> : <Upload className="h-5 w-5 text-zinc-500" />}
                      <span className={resume ? 'text-white' : 'text-zinc-400'}>
                        {resume ? resume.name : <>Drop a file or <span className="text-white underline underline-offset-4">browse</span> · PDF or Word, up to {MAX_MB} MB</>}
                      </span>
                      <input name="resume" type="file" accept=".pdf,.doc,.docx" className="sr-only" onChange={(e) => pickFile(e.target.files?.[0])} />
                    </label>
                    {err('resume')}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="mt-8 w-full rounded-xl bg-white py-3.5 text-[15.5px] font-medium text-black transition hover:bg-white/90 disabled:opacity-60"
                >
                  {state === 'sending' ? 'Sending…' : 'Send application'}
                </button>
                <p className="mt-4 text-center text-[12.5px] text-zinc-500">
                  We use your details only to review your application. See our <a href="/privacy" className="underline underline-offset-4 hover:text-zinc-300">Privacy Policy</a>.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
