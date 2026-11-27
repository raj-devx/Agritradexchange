import { Lock } from "lucide-react";
import { Container } from "@/components/container";
import { ButtonLink } from "@/components/ui/button";

export function LoginPlaceholder({
  role,
  registerHref,
}: {
  role: "Farmer" | "Buyer";
  registerHref: string;
}) {
  return (
    <section className="relative overflow-hidden bg-cream py-20">
      <Container className="max-w-md">
        <div className="gborder animate-fade-up rounded-3xl border border-black/5 bg-white p-8 text-center shadow-[var(--shadow-lift)]">
          <span className="live-dot mx-auto flex size-14 items-center justify-center rounded-2xl bg-leaf/10 text-leaf ring-1 ring-leaf/20">
            <Lock className="size-6" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-brand">
            {role} login
          </h1>
          <p className="mt-3 text-sm text-ink/70">
            Secure {role.toLowerCase()} accounts with mobile-OTP sign-in and a full
            dashboard are part of the next version (Digital India). For now, you can
            register and our team will be in touch.
          </p>
          <div className="mt-6 flex flex-col gap-2">
            <ButtonLink href={registerHref} variant="primary">
              Register instead
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost">
              Contact the team
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
