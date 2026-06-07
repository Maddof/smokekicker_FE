// components/quantityButton.jsx

export default function QuantityButton({
  onClick,
  icon: Icon,
  disabled = false,
}) {
  return (
    <button
      className={`flex h-7 w-7 items-center justify-center rounded-full ${
        disabled
          ? "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
          : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
      <Icon />
    </button>
  );
}
