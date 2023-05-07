import { TBoardCoordinates } from "../../util/plane";

class AStarNode {
  coord: TBoardCoordinates;
  parent: AStarNode | null;
  g: number;
  h: number;

  constructor(coord: TBoardCoordinates, parent: AStarNode | null, g: number, h: number) {
    this.coord = coord;
    this.parent = parent;
    this.g = g;
    this.h = h;
  }

  get f(): number {
    return this.g + this.h;
  }
}

export class Paths {
  private boardSize: number;
  private board: boolean[][];

  constructor(boardSize: number) {
    this.boardSize = boardSize;
    this.board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(false));
  }

  markNodeAsWall(coordinates: TBoardCoordinates) {
    if (this.isValidCoordinate(coordinates)) {
      this.board[coordinates.x][coordinates.y] = true;
    }
  }

  findBestPath(a: TBoardCoordinates, b: TBoardCoordinates): TBoardCoordinates[] {
    if (!this.isValidCoordinate(a) || !this.isValidCoordinate(b)) {
      return [];
    }

    const openSet: AStarNode[] = [new AStarNode(a, null, 0, this.distance(a, b))];
    const closedSet: AStarNode[] = [];

    while (openSet.length > 0) {
      const currentNode = this.getLowestCostNode(openSet);

      if (currentNode.coord.x === b.x && currentNode.coord.y === b.y) {
        const path: TBoardCoordinates[] = [];
        let current: AStarNode | null = currentNode;
        let previousDirection: TBoardCoordinates | null = null;

        while (current !== null) {
          const next: AStarNode | null = current.parent;

          if (next !== null) {
            const direction: TBoardCoordinates = {
              x: next.coord.x - current.coord.x,
              y: next.coord.y - current.coord.y,
            };

            if (
              previousDirection === null ||
              direction.x !== previousDirection.x ||
              direction.y !== previousDirection.y
            ) {
              path.unshift(current.coord);
            }

            previousDirection = direction;
          } else {
            // Incluye el punto de inicio (a) en el camino
            path.unshift(current.coord);
          }

          current = next;
        }

        return path;
      }

      openSet.splice(openSet.indexOf(currentNode), 1);
      closedSet.push(currentNode);

      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (x === 0 && y === 0) {
            continue;
          }

          const nextCoord: TBoardCoordinates = {
            x: currentNode.coord.x + x,
            y: currentNode.coord.y + y,
          };

          if (!this.isValidCoordinate(nextCoord) || this.board[nextCoord.x][nextCoord.y]) {
            continue;
          }

          const g = currentNode.g + this.distance(currentNode.coord, nextCoord);
          const h = this.distance(nextCoord, b);

          const existingNodeInOpenSet = openSet.find((node) =>
            this.coordinatesEqual(node.coord, nextCoord)
          );
          const existingNodeInClosedSet = closedSet.find((node) =>
            this.coordinatesEqual(node.coord, nextCoord)
          );
          if (existingNodeInOpenSet && g < existingNodeInOpenSet.g) {
            existingNodeInOpenSet.parent = currentNode;
            existingNodeInOpenSet.g = g;
          } else if (existingNodeInClosedSet && g < existingNodeInClosedSet.g) {
            existingNodeInClosedSet.parent = currentNode;
            existingNodeInClosedSet.g = g;

            openSet.push(existingNodeInClosedSet);
            closedSet.splice(closedSet.indexOf(existingNodeInClosedSet), 1);
          } else if (!existingNodeInOpenSet && !existingNodeInClosedSet) {
            openSet.push(new AStarNode(nextCoord, currentNode, g, h));
          }
        }
      }
    }

    return [];
  }

  private isValidCoordinate(coord: TBoardCoordinates): boolean {
    return coord.x >= 0 && coord.x < this.boardSize && coord.y >= 0 && coord.y < this.boardSize;
  }

  private getLowestCostNode(nodes: AStarNode[]): AStarNode {
    return nodes.reduce((lowest, node) => (node.f < lowest.f ? node : lowest));
  }

  private distance(a: TBoardCoordinates, b: TBoardCoordinates): number {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  }

  private coordinatesEqual(a: TBoardCoordinates, b: TBoardCoordinates): boolean {
    return a.x === b.x && a.y === b.y;
  }
}
