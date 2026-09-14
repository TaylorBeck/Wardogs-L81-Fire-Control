/**
 * Wardogs L81 Fire Control math.
 *
 * Coordinates are entered as positive-only decimal grid values (e.g. "14.5").
 * Distance is a scaled Euclidean distance rounded to the nearest 5 meters.
 * Bearing is the azimuth from the mortar to the target, normalized to 0-359.9 degrees.
 */

export interface Coords {
  mortarX: string;
  mortarY: string;
  targetX: string;
  targetY: string;
}

export type FieldKey = keyof Coords;

export const FIELD_ORDER: FieldKey[] = [
  "mortarX",
  "mortarY",
  "targetX",
  "targetY",
];

export const EMPTY_COORDS: Coords = {
  mortarX: "",
  mortarY: "",
  targetX: "",
  targetY: "",
};

/**
 * Returns the next field in the standard entry order, wrapping back to the start.
 */
export function nextField(current: FieldKey): FieldKey {
  const index = FIELD_ORDER.indexOf(current);
  return FIELD_ORDER[(index + 1) % FIELD_ORDER.length];
}

export interface FireSolution {
  distance: number;
  bearing: number;
}

const GRID_SCALE = 100;

/**
 * Parses a raw coordinate string into a finite number.
 * Returns null for empty, incomplete (e.g. "1."), or non-finite input.
 */
export function parseCoord(raw: string): number | null {
  if (raw.trim() === "" || raw.trim() === ".") return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

/**
 * Rounds a distance to the nearest 5 meters (e.g. 512 -> 510, 513 -> 515).
 */
export function roundToNearest5(value: number): number {
  return Math.round(value / 5) * 5;
}

/**
 * Computes the scaled Euclidean distance in meters between mortar and target,
 * rounded to the nearest 5 meters.
 */
export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  const raw = Math.sqrt(
    Math.pow((x1 - x2) * GRID_SCALE, 2) + Math.pow((y1 - y2) * GRID_SCALE, 2)
  );
  return roundToNearest5(raw);
}

/**
 * Computes the bearing (azimuth) in degrees from mortar to target,
 * normalized to a 0-359.9 range and rounded to 1 decimal place.
 */
export function calculateBearing(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  let bearing = Math.atan2(x2 - x1, y2 - y1) * (180 / Math.PI);
  if (bearing < 0) bearing += 360;
  return Math.round(bearing * 10) / 10;
}

/**
 * Computes the full fire solution from raw coordinate strings.
 * Returns null until all four coordinates are complete, valid numbers.
 */
export function calculateFireSolution(coords: Coords): FireSolution | null {
  const x1 = parseCoord(coords.mortarX);
  const y1 = parseCoord(coords.mortarY);
  const x2 = parseCoord(coords.targetX);
  const y2 = parseCoord(coords.targetY);

  if (x1 === null || y1 === null || x2 === null || y2 === null) {
    return null;
  }

  return {
    distance: calculateDistance(x1, y1, x2, y2),
    bearing: calculateBearing(x1, y1, x2, y2),
  };
}
