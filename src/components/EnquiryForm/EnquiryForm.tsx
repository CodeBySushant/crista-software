import { useId, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/Buttons/Button';
import { cn } from '@/utils/cn';

export const serviceOptions = ['Web Development', 'Mobile App Development', 'Custom Software', 'AI & Automation', 'UI/UX Design', 'Cloud & DevOps', 'Product enquiry', 'Other'];
const budgets = ['Not sure yet', 'Under $5k', '$5k – $15k', '$15k – $50k', '$50k+'];
const timelines = ['Flexible', 'Within 1 month', '1 – 3 months', '3 – 6 months', '6+ months'];

export type EnquiryValues = {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  budget: string;
  description: string;
  timeline: string;
};
type Errors = Partial<Record<keyof EnquiryValues, string>>;

const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|icloud|aol|proton)\./i;

export function validate(v: EnquiryValues): Errors {
  const e: Errors = {};
  if (v.name.trim().length < 2) e.name = 'Please enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if (!v.company.trim()) e.company = 'Company name helps us prepare.';
  if (v.phone && !/^[+()\d\s-]{7,20}$/.test(v.phone.trim())) e.phone = 'Use digits, spaces, + or -.';
  if (!v.service) e.service = 'Choose the closest service.';
  if (v.description.trim().length < 30) e.description = 'A few sentences (30+ characters) help us respond properly.';
  return e;
}

/**
 * Frontend-only enquiry form. `onSubmit` is the integration seam — swap
 * the simulated delay for an API call when a backend is ready.
 */
export function EnquiryForm({ initialService = '', onSubmit }: { initialService?: string; onSubmit?: (v: EnquiryValues) => Promise<void> }) {
  const empty: EnquiryValues = { name: '', email: '', company: '', phone: '', service: initialService, budget: '', description: '', timeline: '' };
  const [values, setValues] = useState<EnquiryValues>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof EnquiryValues, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const reduce = useReducedMotion();
  const uid = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof EnquiryValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const next = { ...values, [k]: e.target.value };
    setValues(next);
    if (touched[k]) setErrors(validate(next));
  };
  const blur = (k: keyof EnquiryValues) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(values));
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate(values);
    setErrors(errs);
    setTouched({ name: true, email: true, company: true, phone: true, service: true, description: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    setStatus('sending');
    await (onSubmit ? onSubmit(values) : new Promise<void>((r) => setTimeout(r, 1100)));
    setStatus('sent');
    requestAnimationFrame(() => rootRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }));
  }

  const field = (k: keyof EnquiryValues) => ({
    id: `${uid}-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    'aria-invalid': !!(touched[k] && errors[k]),
    'aria-describedby': touched[k] && errors[k] ? `${uid}-${k}-err` : undefined,
  });

  return (
    <div ref={rootRef} className="relative scroll-mt-28">
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div
            key="sent"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[22px] bg-inverse p-8 text-white sm:p-12"
            role="status"
            aria-live="polite"
          >
            <div className="grid-paper-dark fade-mask-b absolute inset-0" aria-hidden />
            <div className="relative">
              <motion.div initial={reduce ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }} className="grid h-14 w-14 place-items-center rounded-full bg-brand-gradient text-ink">
                <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden />
              </motion.div>
              <h2 className="mt-8 font-display text-[34px] font-medium leading-tight tracking-tighter2 sm:text-[42px]">Thank you, {values.name.split(' ')[0]}.</h2>
              <p className="mt-4 max-w-md text-[16px] leading-relaxed text-white/65">
                Your enquiry about <span className="text-white">{values.service}</span> has been received. Someone from the team will review it and reply to <span className="text-white">{values.email}</span>.
              </p>
              <ol className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
                {['We review your requirements', 'We schedule a discovery call', 'You receive a proposed approach'].map((s) => (
                  <li key={s} className="text-[14px] text-white/70">{s}</li>
                ))}
              </ol>
              <p className="mt-8 font-mono text-[11px] text-white/35">Demo mode — this form is not connected to a backend yet.</p>
              <button type="button" onClick={() => { setValues(empty); setTouched({}); setErrors({}); setStatus('idle'); }} className="mt-6 text-[14px] font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
                Send another enquiry
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} noValidate initial={false} exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }} className="grid gap-x-5 gap-y-6 sm:grid-cols-2" aria-label="Project enquiry">
            <Field label="Full name" id={`${uid}-name`} error={touched.name ? errors.name : undefined} required>
              <input {...field('name')} autoComplete="name" className={inputCls(touched.name && errors.name)} />
            </Field>
            <Field label="Business email" id={`${uid}-email`} error={touched.email ? errors.email : undefined} required hint={FREE_MAIL.test(values.email) ? 'A company address helps us respond faster.' : undefined}>
              <input {...field('email')} type="email" autoComplete="email" inputMode="email" className={inputCls(touched.email && errors.email)} />
            </Field>
            <Field label="Company name" id={`${uid}-company`} error={touched.company ? errors.company : undefined} required>
              <input {...field('company')} autoComplete="organization" className={inputCls(touched.company && errors.company)} />
            </Field>
            <Field label="Phone number" id={`${uid}-phone`} error={touched.phone ? errors.phone : undefined} optional>
              <input {...field('phone')} type="tel" autoComplete="tel" inputMode="tel" className={inputCls(touched.phone && errors.phone)} />
            </Field>

            <fieldset className="sm:col-span-2">
              <legend className="mb-3 text-[13px] font-medium text-ink">Service required <span className="text-brand-emerald">*</span></legend>
              <div className="flex flex-wrap gap-2" role="radiogroup">
                {serviceOptions.map((o) => (
                  <label key={o} className={cn('cursor-pointer select-none rounded-full px-4 py-2.5 text-[13.5px] transition-all', values.service === o ? 'bg-inverse text-white' : 'bg-surface text-ink ring-1 ring-inset ring-line hover:ring-ink/30')}>
                    <input type="radio" name="service" value={o} checked={values.service === o} onChange={set('service')} className="sr-only" id={o === serviceOptions[0] ? `${uid}-service` : undefined} />
                    {o}
                  </label>
                ))}
              </div>
              {touched.service && errors.service && <p className="mt-2 text-[12.5px] text-rose-600">{errors.service}</p>}
            </fieldset>

            <Field label="Estimated budget" id={`${uid}-budget`} optional>
              <select {...field('budget')} className={inputCls(false)}>
                <option value="">Select a range</option>
                {budgets.map((b) => <option key={b}>{b}</option>)}
              </select>
            </Field>
            <Field label="Expected timeline" id={`${uid}-timeline`} optional>
              <select {...field('timeline')} className={inputCls(false)}>
                <option value="">Select a timeline</option>
                {timelines.map((b) => <option key={b}>{b}</option>)}
              </select>
            </Field>

            <div className="sm:col-span-2">
              <Field label="Project description" id={`${uid}-description`} error={touched.description ? errors.description : undefined} required>
                <textarea {...field('description')} rows={5} placeholder="What are you building, who is it for, and what does success look like?" className={cn(inputCls(touched.description && errors.description), 'h-auto resize-y py-3 leading-relaxed')} />
              </Field>
              <p className="mt-1.5 text-right font-mono text-[11px] text-muted">{values.description.trim().length} / 30+</p>
            </div>

            <div className="flex flex-col-reverse items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12.5px] text-muted">By submitting, you agree to be contacted about your enquiry.</p>
              <Button type="submit" variant="primary" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
                {status === 'sending' ? (<><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…</>) : 'Send enquiry'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function inputCls(invalid: unknown) {
  return cn(
    'h-12 w-full rounded-xl bg-surface px-4 text-[15px] text-ink outline-none ring-1 ring-inset transition-shadow placeholder:text-muted/70',
    invalid ? 'ring-rose-400 focus:ring-2 focus:ring-rose-400' : 'ring-line hover:ring-ink/25 focus:ring-2 focus:ring-brand-emerald',
  );
}

function Field({ label, id, error, required, optional, hint, children }: { label: string; id: string; error?: string; required?: boolean; optional?: boolean; hint?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-center justify-between text-[13px] font-medium text-ink">
        <span>{label} {required && <span className="text-brand-emerald">*</span>}</span>
        {optional && <span className="font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error ? <p id={`${id}-err`} className="mt-2 text-[12.5px] text-rose-600">{error}</p> : hint ? <p className="mt-2 text-[12.5px] text-muted">{hint}</p> : null}
    </div>
  );
}
