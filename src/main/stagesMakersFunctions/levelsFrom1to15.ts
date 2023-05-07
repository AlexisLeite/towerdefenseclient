import { Stage } from "../../stages/Stage";
import { TAppContext } from "../App";

export function levelsFrom1to15(context: TAppContext) {
  const stage = new Stage().setBatchesInterval(1000).setCreepsInterval(150);

  for (let i = 0; i < 15; i++) stage.add(30, i);

  stage
    .setStartPoints(new Array(context.boardSize).fill(1).map((_, i) => ({ x: i, y: 1 })))
    .setEndPoints(
      new Array(context.boardSize).fill(1).map((_, i) => ({ x: i, y: context.boardSize - 1 }))
    )
    .start(context);
}
