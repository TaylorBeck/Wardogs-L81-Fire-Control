"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import CoordCard from "@/components/CoordCard";
import Keypad from "@/components/Keypad";
import SolutionPanel from "@/components/SolutionPanel";
import {
  EMPTY_COORDS,
  calculateFireSolution,
  nextField,
  type Coords,
  type FieldKey,
} from "@/lib/fire-control";

const MAX_FIELD_LENGTH = 7;

export default function Home() {
  const [coords, setCoords] = useState<Coords>(EMPTY_COORDS);
  const [activeField, setActiveField] = useState<FieldKey>("mortarX");

  const solution = useMemo(() => calculateFireSolution(coords), [coords]);

  function handleDigit(digit: string) {
    setCoords((prev) => {
      const current = prev[activeField];
      if (digit === "." && current.includes(".")) return prev;
      if (current.length >= MAX_FIELD_LENGTH) return prev;
      return { ...prev, [activeField]: current + digit };
    });
  }

  function handleBackspace() {
    setCoords((prev) => ({
      ...prev,
      [activeField]: prev[activeField].slice(0, -1),
    }));
  }

  function handleClear() {
    setCoords(EMPTY_COORDS);
    setActiveField("mortarX");
  }

  function handleNext() {
    setActiveField((current) => nextField(current));
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-sm flex-col gap-5 px-4 pb-6 pt-6">
      <header className="flex items-center gap-3">
        <Image
          src="/logo.webp"
          alt="Wardogs L81 logo"
          width={40}
          height={40}
          className="h-10 w-10 shrink-0"
          priority
        />
        <h1 className="text-xl font-extrabold tracking-[0.08em] text-slate-50">
          L81 FIRE CONTROL
        </h1>
      </header>

      <SolutionPanel solution={solution} />

      <div className="flex gap-3">
        <CoordCard
          title="MORTAR"
          titleClassName="text-emerald-400"
          variant="mortar"
          activeField={activeField}
          values={coords}
          onSelect={setActiveField}
        />
        <CoordCard
          title="TARGET"
          titleClassName="text-rose-400"
          variant="target"
          activeField={activeField}
          values={coords}
          onSelect={setActiveField}
        />
      </div>

      <Keypad
        onDigit={handleDigit}
        onBackspace={handleBackspace}
        onClear={handleClear}
        onNext={handleNext}
      />
    </div>
  );
}
