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
  return useCallback((ev: TOnClickCell) => {}, []);
}
