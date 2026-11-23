import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Clock, MessageSquare, FileText } from 'lucide-react';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PageHero } from '@/components/Sections/PageHero';
import { EnquiryForm, serviceOptions } from '@/components/EnquiryForm/EnquiryForm';
import { Reveal } from '@/components/Motion/Reveal';
import { company, telHref } from '@/data/navigation';

/** Maps ?service= / ?topic= query params to a preselected form option. */
function initialService(params: URLSearchParams) {
  const s = params.get('service');
  if (s) {
    const match = serviceOptions.find((o) => s.toLowerCase().startsWith(o.toLowerCase().split(' ')[0]));
    if (s === 'UI/UX & Product Design') return 'UI/UX Design';
    if (s === 'Custom Software Development') return 'Custom Software';
    if (match) return match;
  }
  if (params.get('topic') === 'product') return 'Product enquiry';
  return '';
}

export default function Contact() {
  useDocumentMeta('Contact', 'Start a project with Crista Software. Tell us about your idea and we’ll respond with questions, an approach and next steps.');
  const [params] = useSearchParams();
  const pre = initialService(params);

  return (
    <>
      <PageHero title="Let’s Build Something Meaningful." description="Tell us about the problem you want to solve. The more context you share, the more useful our first reply will be." />

      <section className="container pb-24 lg:pb-32">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal className="space-y-10 lg:sticky lg:top-28">
              <div>
                <p className="eyebrow mb-5">What happens next</p>
                <ol className="space-y-5">
                  {[
                    [MessageSquare, 'We read every enquiry', 'Someone from the team reviews your requirements.'],
                    [Clock, 'Discovery call', 'A conversation to understand goals, users and constraints.'],
                    [FileText, 'Proposed approach', 'Scope, architecture direction and an honest estimate.'],
                  ].map(([Icon, t, d], i) => {
                    const I = Icon as typeof Clock;
                    return (
                      <li key={i} className="flex gap-4">
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full ring-1 ring-line"><I className="h-4 w-4" aria-hidden /></span>
                        <div><p className="text-[15px] font-medium text-ink">{t as string}</p><p className="mt-0.5 text-[14px] text-muted">{d as string}</p></div>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="rounded-2xl bg-paper-off p-6 ring-1 ring-line">
                <p className="eyebrow mb-4">Contact information</p>
                <dl className="space-y-3 text-[14.5px]">
                  <div className="flex justify-between gap-4"><dt className="text-muted">Email</dt><dd>{company.email ? <a href={`mailto:${company.email}`} className="text-ink hover:underline">{company.email}</a> : <span className="placeholder-tag">To be added</span>}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted">Phone</dt><dd>{company.phone ? <a href={telHref(company.phone)} className="text-ink hover:underline">{company.phone}</a> : <span className="placeholder-tag">To be added</span>}</dd></div>
                  <div className="flex justify-between gap-4"><dt className="text-muted">Company</dt><dd>{company.name}</dd></div>
                </dl>
                <a href={company.parentUrl} className="mt-5 inline-flex items-center gap-1 text-[13.5px] text-muted hover:text-ink">Part of {company.parent} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal className="rounded-[24px] bg-surface p-5 shadow-lift ring-1 ring-line sm:p-10">
              <div className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-6">
                <h2 className="font-display text-[24px] font-medium tracking-tight sm:text-[28px]">Project enquiry</h2>
                <span className="font-mono text-[11px] text-muted"><span className="text-brand-emerald">*</span> required</span>
              </div>
              <EnquiryForm key={pre} initialService={pre} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
