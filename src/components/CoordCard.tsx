import type { FieldKey } from "@/lib/fire-control";

interface FieldSpec {
  key: FieldKey;
  label: string;
}

const FIELDS: FieldSpec[] = [
  { key: "mortarX", label: "X-COORD" },
  { key: "mortarY", label: "Y-COORD" },
];

const TARGET_FIELDS: FieldSpec[] = [
  { key: "targetX", label: "X-COORD" },
  { key: "targetY", label: "Y-COORD" },
];

function CoordCell({
  label,
  value,
  isActive,
  onSelect,
  isLocked,
}: {
  label: string;
  value: string;
  isActive: boolean;
  onSelect: () => void;
  isLocked?: boolean;
}) {
  const hasValue = value !== "";

  // Dynamic text sizing based on coordinate length
  // Coordinates can be up to 700.00 (6 chars max)
  function getTextSizeClass(val: string): string {
    const len = val.length;
    if (len <= 2) return "text-2xl";
    if (len <= 4) return "text-xl";
    if (len <= 5) return "text-lg";
    return "text-base";
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={isLocked}
      className={[
        "flex h-20 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 overflow-hidden rounded-xl border px-1.5 transition-colors",
        isLocked
          ? "border-amber-600/30 bg-amber-950/20 cursor-not-allowed opacity-80"
          : isActive
            ? "border-emerald-400 shadow-[0_0_0_1px_rgba(52,211,153,0.4),0_0_14px_2px_rgba(52,211,153,0.35)]"
            : "border-slate-700/60 bg-slate-950/30",
      ].join(" ")}
    >
      <span
        className={[
          "w-full truncate text-[9px] font-semibold uppercase tracking-[0.08em] transition-colors",
          isLocked ? "text-amber-500/60" : isActive ? "text-slate-100" : "text-slate-500",
          hasValue ? "text-left" : "text-center",
        ].join(" ")}
      >
        {label}
      </span>
      {hasValue && (
        <span className={`${getTextSizeClass(value)} w-full truncate text-center font-bold tabular-nums transition-all ${isLocked ? "text-amber-400/70" : "text-slate-50"}`}>
          {value}
        </span>
      )}
    </button>
  );
}

export default function CoordCard({
  title,
  titleClassName,
  variant,
  activeField,
  values,
  onSelect,
  isLocked,
}: {
  title: string;
  titleClassName: string;
  variant: "mortar" | "target";
  activeField: FieldKey;
  values: { mortarX: string; mortarY: string; targetX: string; targetY: string };
  onSelect: (field: FieldKey) => void;
  isLocked?: boolean;
}) {
  const fields = variant === "mortar" ? FIELDS : TARGET_FIELDS;
  const locked = isLocked && variant === "mortar";

  return (
    <div className={[
      "relative min-w-0 flex-1 rounded-2xl border px-2.5 pb-2.5 pt-5 transition-all",
      locked 
        ? "border-amber-500/40 bg-amber-950/20 shadow-[0_0_8px_rgba(245,158,11,0.15)]" 
        : "border-slate-700/60 bg-slate-900/50"
    ].join(" ")}>
      <span
        className={`absolute -top-2.5 left-3 bg-[#070b14] px-1.5 text-[10px] font-semibold tracking-[0.25em] ${titleClassName}`}
      >
        {title}
      </span>
      <div className="flex min-w-0 gap-1.5">
        {fields.map((field) => (
          <CoordCell
            key={field.key}
            label={field.label}
            value={values[field.key]}
            isActive={activeField === field.key}
            onSelect={() => onSelect(field.key)}
            isLocked={locked}
          />
        ))}
      </div>
    </div>
  );
}
