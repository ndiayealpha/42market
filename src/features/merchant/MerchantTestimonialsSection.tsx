import { Avatar } from "@/src/components/atoms/Avatar/Avatar";
import { Card } from "@/src/components/atoms/Card/Card";

import { MERCHANT_TESTIMONIALS } from "./merchant-onboarding.constants";

export function MerchantTestimonialsSection() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <p className="text-[13px] font-bold uppercase text-ink-muted">Retours d&apos;expérience</p>
      <h2 className="text-2xl font-extrabold tracking-[-0.02em] text-foreground-strong sm:text-[32px]">Ils gagnent du temps chaque semaine</h2>

      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {MERCHANT_TESTIMONIALS.map((testimonial) => (
          <Card key={testimonial.name} variant="outlined" className="flex flex-col items-start gap-3 text-left">
            <p className="text-sm italic text-ink-muted">« {testimonial.quote} »</p>
            <div className="mt-auto flex items-center gap-2">
              <Avatar name={testimonial.name} size={32} />
              <div>
                <p className="text-sm font-bold text-foreground-strong">{testimonial.name}</p>
                <p className="text-xs text-ink-muted">{testimonial.role}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
