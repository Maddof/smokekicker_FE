export function ChoiceButtons({ options, onSelect, disabled = false }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.label}
          type="button"
          onClick={() => onSelect(option)}
          disabled={disabled}
          aria-disabled={disabled}
          className="rounded-full border border-white/20 px-4 py-2 text-sm transition hover:bg-white hover:text-black disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
