import { getCellElement } from "../../components/Board/util";
import { Stage } from "../../stages/Stage";
import { TAppContext } from "../App";
import { levelsFrom1to15 } from "../stagesMakersFunctions/levelsFrom1to15";
import { TBoardState } from "./StagesMaker";

export function loadStage(context: TAppContext, state: TBoardState) {
  const stage = new Stage().setBatchesInterval(1000).setCreepsInterval(150);

  for (let y = 0; y < state.length; y++) {
    for (let x = 0; x < state[y].length; x++) {
      const c = state[y][x];
      switch (c) {
        case "endPoint":
          stage.addEndpoint({ x, y });
          break;
        case "startPoint":
          stage.addStartPoint({ x, y });
          break;
        case "wallLine":
          getCellElement({ x, y })?.classList.add("wallLine");

          context.paths.markNodeAsWall({ x, y });
          break;
      }
    }
  }

  levelsFrom1to15(context, stage);
}
