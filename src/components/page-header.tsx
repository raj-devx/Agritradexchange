import { Container } from "@/components/container";
import { Aurora } from "@/components/aurora";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="grain relative overflow-hidden bg-brand text-cream">
      <Aurora />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <Container className="relative z-[1] py-16 sm:py-24">
        {eyebrow && (
          <p className="mb-4 inline-flex animate-fade-up items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold backdrop-blur">
            <span className="live-dot size-1.5 rounded-full bg-gold" />
            {eyebrow}
          </p>
        )}
        <h1
          className="max-w-3xl animate-fade-up text-4xl text-white sm:text-5xl md:text-6xl"
          style={{ animationDelay: "80ms" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-5 max-w-2xl animate-fade-up text-lg leading-relaxed text-cream/75"
            style={{ animationDelay: "160ms" }}
          >
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
