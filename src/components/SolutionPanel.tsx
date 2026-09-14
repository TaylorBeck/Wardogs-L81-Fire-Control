import type { FireSolution } from "@/lib/fire-control";

function IdleDashes() {
  return (
    <div className="flex items-center justify-center gap-1.5 py-2" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-7 rounded-full bg-emerald-400/90 shadow-[0_0_10px_2px_rgba(52,211,153,0.55)]"
        />
      ))}
    </div>
  );
}

function SolutionColumn({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | null;
  unit: string;
}) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 px-2 py-1">
      <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-400">
        {label}
      </span>
      {value === null ? (
        <IdleDashes />
      ) : (
        <span className="py-1 text-4xl font-bold tracking-wide text-emerald-400 [text-shadow:0_0_16px_rgba(52,211,153,0.65)]">
          {value}
        </span>
      )}
      <span className="text-[10px] font-medium tracking-[0.2em] text-emerald-500/80">
        {unit}
      </span>
    </div>
  );
}

export default function SolutionPanel({
  solution,
}: {
  solution: FireSolution | null;
}) {
  const distance = solution ? String(solution.distance) : null;
  const bearing = solution ? solution.bearing.toFixed(1) : null;

  return (
    <div className="relative rounded-2xl border border-slate-700/60 bg-slate-900/50 px-4 pb-4 pt-5">
      <span className="absolute -top-2.5 left-4 bg-[#070b14] px-1.5 text-[10px] font-semibold tracking-[0.25em] text-slate-500">
        SOLUTION
      </span>
      <div className="flex items-stretch">
        <SolutionColumn
          label="ELEVATION/DIST"
          value={distance}
          unit="METERS (RND 5)"
        />
        <div className="w-px shrink-0 self-stretch bg-slate-700/60" />
        <SolutionColumn label="AZIMUTH/BRG" value={bearing} unit="DEGREES" />
      </div>
    </div>
  );
}
