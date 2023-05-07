import { Paths } from "../../paths";

export function usePathsFinder(boardSize: number) {
  const pathsFinder = new Paths(boardSize, boardSize);

  return pathsFinder;
}
