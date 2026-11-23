import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { privacyPolicy, termsAndConditions, type LegalDoc } from '@/data/legal';
import { anchorClick } from '@/utils/scroll';

/** Renders **bold** spans inside legal text. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? <strong key={i} className="font-semibold text-white">{p}</strong> : <Fragment key={i}>{p}</Fragment>,
      )}
    </>
  );
}

/** Privacy Policy and Terms pages: one centred reading column. */
export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const doc: LegalDoc = kind === 'privacy' ? privacyPolicy : termsAndConditions;
  const other = kind === 'privacy'
    ? { to: '/terms', label: termsAndConditions.title }
    : { to: '/privacy', label: privacyPolicy.title };
  useDocumentMeta(doc.title, doc.description);

  return (
    <article className="container pb-32 pt-24 sm:pt-32 lg:pt-40">
      <div className="mx-auto max-w-[720px]">
        <header>
          <h1 className="font-display text-[2.75rem] font-semibold leading-[1.05] text-white sm:text-[3.5rem] lg:text-[4rem]">
            {doc.title}
          </h1>
          <p className="mt-8 font-mono text-[13px] uppercase tracking-[0.08em] text-zinc-500">
            Effective date: {doc.effectiveDate}
          </p>
        </header>

        <div className="mt-10 space-y-6 text-[17px] leading-[1.8] text-zinc-300">
          {doc.intro.map((p) => (
            <p key={p}><Rich text={p} /></p>
          ))}
        </div>

        <nav aria-label="Contents" className="mt-14">
          <ol className="space-y-4">
            {doc.sections.map((s, i) => (
              <li key={s.id} className="flex gap-4 font-mono text-[15px]">
                <span className="w-7 shrink-0 text-right text-zinc-500">{i + 1}.</span>
                <a
                  href={`#${s.id}`}
                  onClick={anchorClick(`#${s.id}`)}
                  className="text-zinc-400 transition-colors hover:text-white"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <hr className="mt-16 border-white/10" />

        {doc.sections.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-28 pt-20">
            <h2 id={`${s.id}-h`} className="font-display text-[1.875rem] font-semibold leading-tight text-white sm:text-[2.25rem]">
              {s.title}
            </h2>
            <div className="mt-10 space-y-12">
              {s.clauses.map((c, j) => (
                <div key={c.title} className="relative">
                  <h3 className="flex items-baseline gap-4 text-[18px] font-semibold text-white">
                    <span className="shrink-0 font-mono text-[15px] font-normal tracking-[0.08em] text-zinc-500 lg:absolute lg:-left-20 lg:w-14 lg:text-right">
                      {i + 1}.{j + 1}
                    </span>
                    {c.title}
                  </h3>
                  <div className="mt-5 space-y-5 text-[17px] leading-[1.8] text-zinc-300">
                    {c.body.map((p) => (
                      <p key={p}><Rich text={p} /></p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <p className="mt-24 text-[15px] text-zinc-500">
          See also our{' '}
          <Link to={other.to} className="text-zinc-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white">
            {other.label}
          </Link>
          .
        </p>
      </div>
    </article>
  );
}
