interface AddBoundaryParams {
  num: number;
  min?: number;
  max?: number;
}

export function addBoundary({ num, min = 0, max }: AddBoundaryParams): number {
  if (num < min) {
    return min;
  } else if (max !== undefined && num > max) {
    return max;
  } else {
    return num;
  }
}
