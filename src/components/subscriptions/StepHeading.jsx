export default function StepHeading({ title, description }) {
  return (
    <div className="mb-4 flex flex-col items-center">
      <div className="mb-4 flex items-center justify-center gap-2">
        <div className="bg-primary/70 h-[2px] w-6"></div>
        <span className="text-center uppercase">{title}</span>
        <div className="bg-primary/70 h-[2px] w-6"></div>
      </div>
      {description && (
        <p className="text-muted-foreground max-w-64 text-center">
          {description}
        </p>
      )}
    </div>
  );
}
