import { TBoardCoordinates, TCoordinates } from "../../util/plane";
import { TAppContext } from "../main/App";

export function makeStages(
  context: TAppContext,
  startPoints: TCoordinates[],
  endPoints: TCoordinates[]
): Record<number, Record<number, TBoardCoordinates[]>> {
  const result: Record<number, Record<number, TBoardCoordinates[]>> = {};

  for (let startPoint = 0; startPoint < startPoints.length; startPoint++) {
    for (let endPoint = 0; endPoint < endPoints.length; endPoint++) {
      if (!result[startPoint]?.[endPoint]) {
        result[startPoint] = {};
        result[startPoint][endPoint] = [];
      }
      result[startPoint][endPoint] = context.paths.findBestPath(
        startPoints[startPoint],
        endPoints[endPoint]
      );
    }
  }

  return result;
}
