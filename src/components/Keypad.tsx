import { ChevronRight, Delete } from "lucide-react";
import type { ReactNode } from "react";

type KeyAction =
  | { type: "digit"; value: string }
  | { type: "backspace" }
  | { type: "clear" }
  | { type: "next" }
  | { type: "blank" };

interface KeyDef {
  action: KeyAction;
  className?: string;
  rowSpan?: number;
}

const KEYS: KeyDef[] = [
  // Row 1
  { action: { type: "digit", value: "7" } },
  { action: { type: "digit", value: "8" } },
  { action: { type: "digit", value: "9" } },
  { action: { type: "backspace" } },
  // Row 2
  { action: { type: "digit", value: "4" } },
  { action: { type: "digit", value: "5" } },
  { action: { type: "digit", value: "6" } },
  { action: { type: "blank" } },
  // Row 3
  { action: { type: "digit", value: "1" } },
  { action: { type: "digit", value: "2" } },
  { action: { type: "digit", value: "3" } },
  { action: { type: "clear" }, rowSpan: 2 },
  // Row 4
  { action: { type: "blank" } },
  { action: { type: "digit", value: "0" } },
  { action: { type: "digit", value: "." } },
];

function keyLabel(action: KeyAction): ReactNode {
  switch (action.type) {
    case "digit":
      return action.value;
    case "backspace":
      return <Delete size={26} strokeWidth={2} />;
    case "clear":
      return "CLR";
    case "next":
      return <ChevronRight size={28} strokeWidth={2.5} />;
    case "blank":
      return null;
  }
}

function keyStyles(action: KeyAction): string {
  switch (action.type) {
    case "backspace":
    case "clear":
      return "border-rose-900/60 bg-rose-950/40 text-rose-400 active:bg-rose-900/50";
    case "blank":
      return "invisible";
    default:
      return "border-slate-700/60 bg-slate-900/60 text-slate-100 active:bg-slate-800/70";
  }
}

export default function Keypad({
  onDigit,
  onBackspace,
  onClear,
  onNext,
}: {
  onDigit: (value: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onNext: () => void;
}) {
  function handlePress(action: KeyAction) {
    switch (action.type) {
      case "digit":
        onDigit(action.value);
        break;
      case "backspace":
        onBackspace();
        break;
      case "clear":
        onClear();
        break;
      case "next":
        onNext();
        break;
      case "blank":
        break;
    }
  }

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-3">
      {KEYS.map((key, i) => (
        <button
          key={i}
          type="button"
          disabled={key.action.type === "blank"}
          onClick={() => handlePress(key.action)}
          style={key.rowSpan ? { gridRow: `span ${key.rowSpan} / span ${key.rowSpan}` } : undefined}
          className={[
            "flex min-h-16 items-center justify-center rounded-2xl border text-2xl font-bold tracking-wide transition-colors",
            key.action.type === "clear" ? "text-lg tracking-[0.15em]" : "",
            keyStyles(key.action),
          ].join(" ")}
        >
          {keyLabel(key.action)}
        </button>
      ))}
    </div>
  );
}
