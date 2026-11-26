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
    <section className="py-20">
      <Container className="max-w-md">
        <div className="rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm">
          <span className="mx-auto flex size-12 items-center justify-center rounded-xl bg-cream text-leaf">
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
