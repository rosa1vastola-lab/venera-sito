export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className ?? ""}`}
    >
      <span className="font-serif text-2xl font-medium tracking-[0.15em]">
        Venere Lash
      </span>
      <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.5em] opacity-80">
        Studio
      </span>
    </span>
  )
}
