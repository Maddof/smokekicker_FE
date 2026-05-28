export default function QuickHeaderHeading({ heading, className = "" }) {
  return (
    <h2
      className={`text-secondary-foreground border-primary border-l-8 pl-3 text-sm font-semibold uppercase${className ? ` ${className}` : ""}`}
    >
      {heading}
    </h2>
  );
}
