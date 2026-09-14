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
  const [mortarLocked, setMortarLocked] = useState(false);

  const solution = useMemo(() => calculateFireSolution(coords), [coords]);

  function handleDigit(digit: string) {
    // Don't allow input on locked mortar fields
    if (mortarLocked && (activeField === "mortarX" || activeField === "mortarY")) {
      return;
    }

    setCoords((prev) => {
      const current = prev[activeField];
      
      // Prevent multiple decimal points
      if (digit === "." && current.includes(".")) return prev;
      
      // Check decimal places - if we already have 2 decimal places, auto-advance instead
      const decimalIndex = current.indexOf(".");
      if (decimalIndex !== -1) {
        const decimalPlaces = current.length - decimalIndex - 1;
        if (decimalPlaces >= 2) {
          // Already at 2 decimal places - auto-advance to next field (except for targetY)
          if (activeField !== "targetY") {
            setActiveField((current) => nextField(current));
          }
          return prev;
        }
      }
      
      // Prevent exceeding max length
      if (current.length >= MAX_FIELD_LENGTH) return prev;
      
      const newValue = current + digit;
      
      // Auto-advance if we just completed 2 decimal places (except for targetY)
      if (decimalIndex !== -1 && newValue.length - decimalIndex - 1 === 2) {
        if (activeField !== "targetY") {
          setTimeout(() => setActiveField((current) => nextField(current)), 100);
        }
      }
      
      return { ...prev, [activeField]: newValue };
    });
  }

  function handleBackspace() {
    // Don't allow backspace on locked mortar fields
    if (mortarLocked && (activeField === "mortarX" || activeField === "mortarY")) {
      return;
    }

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

  function handleLockToggle() {
    setMortarLocked((prev) => {
      const newLocked = !prev;
      // If locking and currently on a mortar field, switch to targetX
      if (newLocked && (activeField === "mortarX" || activeField === "mortarY")) {
        setActiveField("targetX");
      }
      return newLocked;
    });
  }

  function handleFieldSelect(field: FieldKey) {
    // Prevent selecting mortar fields when locked
    if (mortarLocked && (field === "mortarX" || field === "mortarY")) {
      return;
    }
    setActiveField(field);
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

      <div className="flex min-w-0 gap-2">
        <CoordCard
          title="MORTAR"
          titleClassName="text-emerald-400"
          variant="mortar"
          activeField={activeField}
          values={coords}
          onSelect={handleFieldSelect}
          isLocked={mortarLocked}
        />
        <CoordCard
          title="TARGET"
          titleClassName="text-rose-400"
          variant="target"
          activeField={activeField}
          values={coords}
          onSelect={handleFieldSelect}
        />
      </div>

      <Keypad
        onDigit={handleDigit}
        onBackspace={handleBackspace}
        onClear={handleClear}
        onNext={handleNext}
        onLockToggle={handleLockToggle}
        isLocked={mortarLocked}
      />
    </div>
  );
}
