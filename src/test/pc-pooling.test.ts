import { describe, expect, it } from "vitest";
import { PC_GOAL, POOLING_EXAMPLES, sharePerPerson } from "../lib/pc-pooling";

describe("PC pooling examples", () => {
  it("splits the $809 PC goal into groups that cover the whole price", () => {
    expect(PC_GOAL).toBe(809);
    expect(POOLING_EXAMPLES).toEqual([
      { people: 8, amount: 101.13 },
      { people: 16, amount: 50.57 },
      { people: 32, amount: 25.29 },
    ]);
    for (const { people, amount } of POOLING_EXAMPLES) {
      expect(people * amount).toBeGreaterThanOrEqual(809);
      expect(people * (amount - 0.01)).toBeLessThan(809);
    }
  });

  it("rejects invalid group sizes", () => {
    for (const people of [0, -1, 1.5]) {
      expect(() => sharePerPerson(people)).toThrow(RangeError);
    }
  });
});