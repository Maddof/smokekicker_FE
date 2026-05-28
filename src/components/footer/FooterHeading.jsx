export default function FooterHeading({ children, className = "" }) {
  return (
    <div
      role="heading"
      aria-level="2"
      className={`text-secondary-foreground border-primary mb-2 border-l-8 pl-3 font-semibold uppercase ${className}`}
    >
      {children}
    </div>
  );
}
