import { TBoardCoordinates, TCoordinates, plane } from "../../../util/plane";
import { TAppContext } from "../../main/App";
import { addBoundary } from "./../../../util/addBoundary";

/**
 * Dado el elemento HTML de una celda, devuelve las coordenadas numéricas de la misma.
 */
export function getCellCoordinates(cell: HTMLElement): TBoardCoordinates {
  const x = Number(cell.dataset.column);
  const y = Number(cell.dataset.row);

  return { x, y };
}

export function getCellElement(coordinates: TBoardCoordinates) {
  return document.querySelector<HTMLElement>(
    `[data-column="${coordinates.x}"][data-row="${coordinates.y}"]`
  );
}

export function getClosestCellElement(context: TAppContext, coordinates: TCoordinates) {
  const board = document.querySelector(".board") as HTMLElement;
  const bound = plane.bound(board);
  const distance = plane.distance({ x: bound.left, y: bound.top }, coordinates);

  const cellCoordinates = {
    x: addBoundary({
      num: Math.floor(Math.abs(distance.x) / context.unit),
      max: context.boardSize - 1,
    }),
    y: addBoundary({
      num: Math.floor(Math.abs(distance.y) / context.unit),
      max: context.boardSize - 1,
    }),
  };

  return getCellElement(cellCoordinates) as HTMLElement;
}
