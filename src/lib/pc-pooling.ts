export const PC_GOAL = 809;

// Round up to cents so each example covers the full goal, not slightly less.
export function sharePerPerson(people: number): number {
  if (!Number.isInteger(people) || people <= 0) {
    throw new RangeError("The group size must be a positive whole number.");
  }
  return Math.ceil((PC_GOAL * 100) / people) / 100;
}

export const POOLING_EXAMPLES = [8, 16, 32].map((people) => ({
  people,
  amount: sharePerPerson(people),
}));