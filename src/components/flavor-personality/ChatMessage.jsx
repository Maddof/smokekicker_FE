import { ChoiceButtons } from "./ChoiceButton";

const BASE_MESSAGE_STYLES =
  "chat-message-fade-in rounded-2xl border px-4 py-3 text-sm leading-relaxed transition-colors";

export function UserMessage({ content }) {
  return (
    <div
      className={[
        BASE_MESSAGE_STYLES,
        "ml-auto rounded-br-sm border-cyan-200/60 bg-linear-to-br from-cyan-100/95 via-sky-100/90 to-blue-100/85 text-black",
      ].join(" ")}
    >
      <p>{content}</p>
    </div>
  );
}

export function AIMessage({
  content,
  options,
  onSelect,
  disableOptions = false,
  children,
}) {
  return (
    <div
      className={[
        BASE_MESSAGE_STYLES,
        "rounded-bl-sm border-sky-300/30 bg-linear-to-br from-slate-900/80 via-blue-900/45 to-cyan-900/25 text-sky-50",
      ].join(" ")}
    >
      <p>{content}</p>
      {children}
      {options?.length > 0 && (
        <ChoiceButtons
          options={options}
          onSelect={onSelect}
          disabled={disableOptions}
        />
      )}
    </div>
  );
}
