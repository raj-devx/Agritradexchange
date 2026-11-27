import { cn } from "@/lib/cn";

/** Drifting colour blobs + grid + grain for dark green sections. */
export function Aurora({ className, grid = true }: { className?: string; grid?: boolean }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="aurora-blob aurora-a -left-24 -top-24 size-[28rem] bg-leaf/30" />
      <div className="aurora-blob aurora-b -right-24 top-10 size-[26rem] bg-gold/20" />
      <div className="aurora-blob aurora-a bottom-[-8rem] left-1/3 size-[24rem] bg-brand-500/40" />
      {grid && <div className="bg-grid-fade absolute inset-0" />}
    </div>
  );
}
