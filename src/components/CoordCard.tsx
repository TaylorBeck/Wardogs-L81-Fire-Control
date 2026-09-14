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
}: {
  label: string;
  value: string;
  isActive: boolean;
  onSelect: () => void;
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
      className={[
        "flex h-20 min-w-0 flex-1 flex-col items-center justify-center gap-0.5 overflow-hidden rounded-xl border px-1.5 transition-colors",
        isActive
          ? "border-emerald-400 shadow-[0_0_0_1px_rgba(52,211,153,0.4),0_0_14px_2px_rgba(52,211,153,0.35)]"
          : "border-slate-700/60 bg-slate-950/30",
      ].join(" ")}
    >
      <span
        className={[
          "w-full truncate text-[9px] font-semibold uppercase tracking-[0.08em] transition-colors",
          isActive ? "text-slate-100" : "text-slate-500",
          hasValue ? "text-left" : "text-center",
        ].join(" ")}
      >
        {label}
      </span>
      {hasValue && (
        <span className={`${getTextSizeClass(value)} w-full truncate text-center font-bold tabular-nums text-slate-50 transition-all`}>
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
}: {
  title: string;
  titleClassName: string;
  variant: "mortar" | "target";
  activeField: FieldKey;
  values: { mortarX: string; mortarY: string; targetX: string; targetY: string };
  onSelect: (field: FieldKey) => void;
}) {
  const fields = variant === "mortar" ? FIELDS : TARGET_FIELDS;

  return (
    <div className="relative min-w-0 flex-1 rounded-2xl border border-slate-700/60 bg-slate-900/50 px-2.5 pb-2.5 pt-5">
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
          />
        ))}
      </div>
    </div>
  );
}
