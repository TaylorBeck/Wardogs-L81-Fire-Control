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

  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "flex h-20 flex-1 flex-col items-center justify-center gap-1 rounded-xl border px-2 transition-colors",
        isActive
          ? "border-emerald-400 shadow-[0_0_0_1px_rgba(52,211,153,0.4),0_0_14px_2px_rgba(52,211,153,0.35)]"
          : "border-slate-700/60 bg-slate-950/30",
      ].join(" ")}
    >
      <span
        className={[
          "whitespace-nowrap text-[10px] font-semibold tracking-[0.1em] transition-colors",
          isActive ? "text-slate-100" : "text-slate-500",
          hasValue ? "self-start" : "",
        ].join(" ")}
      >
        {label}
      </span>
      {hasValue && (
        <span className="text-2xl font-bold tabular-nums text-slate-50">
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
    <div className="relative flex-1 rounded-2xl border border-slate-700/60 bg-slate-900/50 px-3 pb-3 pt-5">
      <span
        className={`absolute -top-2.5 left-3 bg-[#070b14] px-1.5 text-[10px] font-semibold tracking-[0.25em] ${titleClassName}`}
      >
        {title}
      </span>
      <div className="flex gap-2">
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
