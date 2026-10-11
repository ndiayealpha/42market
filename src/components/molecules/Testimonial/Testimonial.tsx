export interface TestimonialProps {
  quote: string;
  author: string;
  className?: string;
}

/**
 * A short customer quote over a dark, translucent card — the signup
 * hero panel's social proof, below the mosaic photo.
 *
 * Correction vs. the mockup: the closing guillemet is glued to the last
 * word with a non-breaking space, instead of a regular space that let
 * "»" wrap onto its own line.
 */
export function Testimonial({ quote, author, className = "" }: TestimonialProps) {
  return (
    <figure className={`rounded-xl bg-foreground-strong/40 p-5 text-white ${className}`}>
      <blockquote className="text-[15px] italic leading-6">{`« ${quote} »`}</blockquote>
      <figcaption className="mt-3 text-[13px] font-bold">— {author}</figcaption>
    </figure>
  );
}
