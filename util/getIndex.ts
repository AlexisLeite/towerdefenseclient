export function getIndex<T>(props: T[], conditions: boolean[]) {
  const index = conditions.findIndex((current) => current === true);

  if (index === -1) return props[props.length - 1];
  return props[index];
}
