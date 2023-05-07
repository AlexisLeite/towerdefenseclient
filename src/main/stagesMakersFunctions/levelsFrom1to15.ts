import { Stage } from "../../stages/Stage";
import { TAppContext } from "../App";

export function levelsFrom1to15(context: TAppContext, stage: Stage) {
  stage.setBatchesInterval(1000).setCreepsInterval(150);

  for (let i = 0; i < 15; i++) stage.add(30, i);

  stage.start(context);
}
