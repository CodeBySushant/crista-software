import { useDocumentMeta } from '@/hooks/useDocumentMeta';
import { Button } from '@/components/Buttons/Button';

export default function NotFound() {
  useDocumentMeta('Page not found', 'The page you were looking for does not exist.');
  return (
    <section className="container grid min-h-[70vh] place-items-center py-24 text-center">
      <div>
        <h1 className="font-display text-[clamp(5rem,18vw,12rem)] font-medium leading-none tracking-tightest">
          4<span className="text-gradient">0</span>4
        </h1>
        <p className="mx-auto mt-6 max-w-md text-[17px] text-muted">This page doesn’t exist — or it moved. Let’s get you back to something useful.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button to="/" arrow>Back to home</Button>
          <Button to="/contact" variant="secondary">Contact us</Button>
        </div>
      </div>
    </section>
  );
}
