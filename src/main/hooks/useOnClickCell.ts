import { useCallback, useRef } from "react";
import { TOnClickCell } from "../../components/Board";
import { TAppContext } from "../App";
import {
  getCellCoordinates,
  getCellElement,
  getClosestCellElement,
} from "../../components/Board/util";
import { creepsStore } from "../../characters/creepsStore";
import { plane } from "../../../util/plane";
import { Creep } from "../../characters/creepsStore/creep";

export function useOnClickCell(context: TAppContext) {
  const creep = useRef<Creep | null>(null);

  return useCallback((ev: TOnClickCell) => {
    if (!creep.current) {
      creep.current = creepsStore.make(1).setPosition(plane.coordinates(ev.cell));
    } else {
      const creepCell = getClosestCellElement(context, plane.coordinates(creep.current.el()));
      document.querySelector<HTMLElement>(".destination")?.classList.remove("destination");
      document.querySelectorAll<HTMLElement>(".path")?.forEach((current) => {
        current.classList.remove("path");
      });

      const paths = context.paths.getPathsBetween(
        getCellCoordinates(creepCell),
        getCellCoordinates(ev.cell)
      );
      const path = paths[Math.floor(Math.random() * paths.length)];

      console.clear();
      console.log(creepCell, getCellCoordinates(ev.cell));
      console.log(paths);

      if (path) {
        path.forEach((node) => {
          const cell = getCellElement({ column: node.x, row: node.y });
          if (cell) {
            cell.classList.add("path");
          }
        });

        creepCell.classList.add("origin");
        ev.cell.classList.add("destination");
      }
    }
  }, []);
}
