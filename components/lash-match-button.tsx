"use client"

import { useLashMatch } from "./lash-match"

export function LashMatchButton({
  className,
  children = "Fai il LASH MATCH",
}: {
  className?: string
  children?: React.ReactNode
}) {
  const { open } = useLashMatch()
  return (
    <button
      type="button"
      onClick={open}
      className={
        className ??
        "inline-flex items-center justify-center rounded-full bg-accent px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-accent-foreground shadow-lg shadow-notte/20 transition-transform hover:scale-[1.03] active:scale-100"
      }
    >
      {children}
    </button>
  )
}
