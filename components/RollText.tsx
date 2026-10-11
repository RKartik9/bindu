// Parent element must have the `group/roll` class.
export function RollText({ children, className = "" }: { children: string; className?: string }) {
  return (
    <span className={`relative inline-flex overflow-hidden ${className}`}>
      <span className="block transition-transform duration-500 ease-roll group-hover/roll:-translate-y-full group-focus-visible/roll:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-roll group-hover/roll:translate-y-0 group-focus-visible/roll:translate-y-0 motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  );
}
