import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, ClipboardCheck } from "lucide-react";
import { isAgentAuthed } from "@/lib/agent-auth";
import { agentLogout } from "@/app/agent/actions";
import { Container } from "@/components/container";

export const instant = false;

export default async function AgentAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAgentAuthed())) redirect("/agent/login");

  return (
    <div className="min-h-screen bg-cream">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-brand text-cream">
        <Container className="flex h-14 items-center justify-between">
          <Link href="/agent" className="flex items-center gap-2 font-display font-extrabold">
            <ClipboardCheck className="size-5 text-gold" /> Field Agent
          </Link>
          <form action={agentLogout}>
            <button className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-cream/80 hover:bg-white/10 hover:text-white">
              <LogOut className="size-4" /> Sign out
            </button>
          </form>
        </Container>
      </header>
      <Container className="max-w-2xl py-6">{children}</Container>
    </div>
  );
}
