import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { PageHero } from '@/components/Sections/PageHero';
import { DraftNotice } from '@/components/Notice/DraftNotice';

/** Placeholder legal pages — real policy text must come from the business. */
export default function Legal({ kind }: { kind: 'privacy' | 'terms' }) {
  const title = kind === 'privacy' ? 'Privacy Policy' : 'Terms and Conditions';
  useDocumentMeta(title, `${title} for Crista Software.`);
  return (
    <>
      <PageHero eyebrow="Legal" title={title} />
      <section className="container max-w-3xl pb-28">
        <DraftNotice>This page is a placeholder. Publish the approved {title.toLowerCase()} from Crista Enterprises here before launch.</DraftNotice>
      </section>
    </>
  );
}
