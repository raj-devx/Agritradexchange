"use client";

import Link from "next/link";
import { useRef } from "react";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  children: React.ReactNode;
  href?: string;
  spot?: string;
  as?: "div" | "li";
};

export function SpotlightCard({ className, children, href, spot, as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const style = spot ? ({ "--spot": spot } as React.CSSProperties) : undefined;
  const cls = cn("spotlight", className);

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.Ref<HTMLAnchorElement>}
        onMouseMove={onMove}
        className={cls}
        style={style}
      >
        {children}
      </Link>
    );
  }
  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement>}
      onMouseMove={onMove}
      className={cls}
      style={style}
    >
      {children}
    </Tag>
  );
}
