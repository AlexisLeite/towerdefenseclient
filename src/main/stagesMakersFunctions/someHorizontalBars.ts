import { getCellElement } from "../../components/Board/util";
import { TAppContext } from "../App";

export function someHorizontalBars(context: TAppContext) {
  for (let i = 0; i < context.boardSize - 2; i++) {
    let coords = {
      x: Math.floor(i),
      y: Math.floor(7),
    };
    getCellElement({ ...coords })?.classList.add("wall");
    context.paths.markNodeAsWall({ ...coords });

    coords = {
      x: Math.floor(context.boardSize - i),
      y: Math.floor(12),
    };
    getCellElement({ ...coords })?.classList.add("wall");
    context.paths.markNodeAsWall({ ...coords });

    coords = {
      x: Math.floor(i),
      y: Math.floor(22),
    };
    getCellElement({ ...coords })?.classList.add("wall");
    context.paths.markNodeAsWall({ ...coords });

    coords = {
      x: Math.floor(context.boardSize - i),
      y: Math.floor(29),
    };
    getCellElement({ ...coords })?.classList.add("wall");
    context.paths.markNodeAsWall({ ...coords });
  }
}
