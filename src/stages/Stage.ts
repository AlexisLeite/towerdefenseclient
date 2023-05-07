import { TBoardCoordinates, plane } from "../../util/plane";
import { creepsStore } from "../characters/creepsStore";
import { getCellElement } from "../components/Board/util";
import { TAppContext } from "../main/App";
import { makeStages } from "./makeWorker";

class StageProps {
  batches: number[][] = [];
  batchesInterval: number = 100;
  creepsInterval: number = 100;
  /**
   * De donde nacen los creeps
   */
  startPoints: TBoardCoordinates[] = [];
  /**
   * Si llegan acá los creeps se restan vidas
   */
  endPoints: TBoardCoordinates[] = [];

  add(count: number, level: number) {
    this.batches.push(new Array(count).fill(level));
    return this;
  }

  // Getter y Setter para "batches"
  getBatches(): number[][] {
    return this.batches;
  }
  setBatches(batches: number[][]) {
    this.batches = batches;
    return this;
  }

  // Getter y Setter para "startPoints"
  getStartPoints(): TBoardCoordinates[] {
    return this.startPoints;
  }
  setStartPoints(startPoints: TBoardCoordinates[]) {
    this.startPoints = startPoints;
    return this;
  }

  // Getter y Setter para "endPoints"
  getEndPoints(): TBoardCoordinates[] {
    return this.endPoints;
  }
  setEndPoints(endPoints: TBoardCoordinates[]) {
    this.endPoints = endPoints;
    return this;
  }

  // Getter y Setter para "batchesInterval"
  getBatchesInterval(): number {
    return this.batchesInterval;
  }
  setBatchesInterval(batchesInterval: number) {
    this.batchesInterval = batchesInterval;
    return this;
  }

  // Getter y Setter para "creepsInterval"
  getCreepsInterval(): number {
    return this.creepsInterval;
  }
  setCreepsInterval(creepsInterval: number) {
    this.creepsInterval = creepsInterval;
    return this;
  }
}

export class Stage extends StageProps {
  paths: Record<number, Record<number, TBoardCoordinates[]>> = {};

  async start(context: TAppContext) {
    this.paths = await makeStages(context, this.startPoints, this.endPoints);
    for await (let batch of this.batches) {
      await (async () => {
        return new Promise<void>((resolveBatch) => {
          setTimeout(() => {
            (async () => {
              for await (let creepLevel of batch) {
                await (() => {
                  return new Promise<void>((resolve) => {
                    setTimeout(() => {
                      const startPoint = Math.floor(Math.random() * this.startPoints.length);
                      const endPoint = Math.floor(Math.random() * this.endPoints.length);

                      if (!this.paths[startPoint]?.[endPoint]) {
                        this.paths[startPoint] = {};
                        this.paths[startPoint][endPoint] = context.paths.findBestPath(
                          this.startPoints[startPoint],
                          this.endPoints[endPoint]
                        );
                      }

                      const creep = creepsStore
                        .make(creepLevel)
                        .setPosition(
                          plane.coordinates(
                            getCellElement(this.paths[startPoint][endPoint][0]) as HTMLElement
                          )
                        );
                      creep.on("mount", () => {
                        for (let coordinates of this.paths[startPoint][endPoint]) {
                          creep.path(plane.coordinates(getCellElement(coordinates) as HTMLElement));
                        }
                        creep.move().then(() => {
                          creep.kill();
                        });
                      });

                      resolve();
                    }, this.creepsInterval);
                  });
                })();
              }
              resolveBatch();
            })();
          }, this.batchesInterval);
        });
      })();
    }
  }
}
