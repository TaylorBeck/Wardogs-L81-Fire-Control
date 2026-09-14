import assert from "node:assert";
import {
  calculateBearing,
  calculateDistance,
  calculateFireSolution,
  nextField,
  parseCoord,
  roundToNearest5,
} from "./fire-control";

// Distance rounding
assert.strictEqual(roundToNearest5(512), 510);
assert.strictEqual(roundToNearest5(513), 515);
assert.strictEqual(roundToNearest5(0), 0);

// Known pair: mortar (0,0) -> target (1,0) => 100m, bearing 90.0
assert.strictEqual(calculateDistance(0, 0, 1, 0), 100);
assert.strictEqual(calculateBearing(0, 0, 1, 0), 90);

// Known pair: mortar (0,0) -> target (0,1) => 100m, bearing 0.0
assert.strictEqual(calculateDistance(0, 0, 0, 1), 100);
assert.strictEqual(calculateBearing(0, 0, 0, 1), 0);

// Known pair: mortar (0,0) -> target (-1,0) => bearing 270.0 (normalized)
assert.strictEqual(calculateBearing(0, 0, -1, 0), 270);

// Known pair: mortar (0,0) -> target (0,-1) => bearing 180.0
assert.strictEqual(calculateBearing(0, 0, 0, -1), 180);

// parseCoord handles incomplete input
assert.strictEqual(parseCoord(""), null);
assert.strictEqual(parseCoord("."), null);
assert.strictEqual(parseCoord("14.5"), 14.5);
assert.strictEqual(parseCoord("0"), 0);

// calculateFireSolution requires all four coords
assert.strictEqual(
  calculateFireSolution({ mortarX: "0", mortarY: "0", targetX: "1", targetY: "" }),
  null
);

const solution = calculateFireSolution({
  mortarX: "0",
  mortarY: "0",
  targetX: "1",
  targetY: "0",
});
assert.ok(solution);
assert.strictEqual(solution.distance, 100);
assert.strictEqual(solution.bearing, 90);

// nextField cycles mortarX -> mortarY -> targetX -> targetY -> mortarX
assert.strictEqual(nextField("mortarX"), "mortarY");
assert.strictEqual(nextField("mortarY"), "targetX");
assert.strictEqual(nextField("targetX"), "targetY");
assert.strictEqual(nextField("targetY"), "mortarX");

console.log("fire-control.test.ts: all assertions passed");
