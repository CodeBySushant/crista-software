import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

type Props = HTMLMotionProps<'div'> & { delay?: number; y?: number };

/** Subtle fade-up on first scroll into view. Disabled for reduced motion. */
export function Reveal({ delay = 0, y = 16, children, ...rest }: Props) {
  const reduce = useReducedMotion();
  if (reduce) return <motion.div {...rest}>{children}</motion.div>;
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word headline reveal. */
export function RevealText({ text, className, id, as: Tag = 'h1' }: { text: string; className?: string; id?: string; as?: 'h1' | 'h2' }) {
  const reduce = useReducedMotion();
  const words = text.split(' ');
  if (reduce) return <Tag id={id} className={className}>{text}</Tag>;
  return (
    <Tag id={id} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
