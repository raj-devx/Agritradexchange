import { redirect } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { isAuthed } from "@/lib/admin-auth";
import { logout } from "@/app/admin/actions";
import { AdminSidebar } from "@/components/admin/sidebar";

// Admin is an always-dynamic, authenticated console — never prerendered.
export const instant = false;

export default async function AdminAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthed())) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-cream">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-black/5 bg-white px-5">
          <span className="font-display font-extrabold text-brand lg:hidden">
            AgriTrade<span className="text-leaf">Xchange</span>
          </span>
          <div className="ml-auto flex items-center gap-2">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-ink/60 hover:bg-cream hover:text-brand"
            >
              <ExternalLink className="size-4" /> View site
            </a>
            <form action={logout}>
              <button className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3 py-1.5 text-sm font-medium text-ink/70 hover:bg-cream">
                <LogOut className="size-4" /> Sign out
              </button>
            </form>
          </div>
        </header>
        <div className="flex-1 p-5 sm:p-7">{children}</div>
      </div>
    </div>
  );
}
