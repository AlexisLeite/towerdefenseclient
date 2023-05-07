import { TCoordinates } from "../../util/plane";

export type TNode = {
  x: number;
  y: number;
  f: number;
  g: number;
  h: number;
  neighbors: TNode[];
  previous: TNode | null;
  wall: boolean;
};

function cloneNodeWithoutNeighbors(node: TNode): TNode {
  return {
    x: node.x,
    y: node.y,
    f: node.f,
    g: node.g,
    h: node.h,
    neighbors: [], // Los vecinos se actualizarán más adelante
    previous: null,
    wall: node.wall,
  };
}

function cloneGrid(grid: TNode[][]): TNode[][] {
  // Clona todos los nodos sin referencias a los vecinos
  const clonedGrid = grid.map((row) => row.map((node) => cloneNodeWithoutNeighbors(node)));

  // Añade las referencias a los vecinos en la cuadrícula clonada
  for (let x = 0; x < clonedGrid.length; x++) {
    for (let y = 0; y < clonedGrid[0].length; y++) {
      const node = clonedGrid[x][y];
      if (x > 0) node.neighbors.push(clonedGrid[x - 1][y]);
      if (x < clonedGrid.length - 1) node.neighbors.push(clonedGrid[x + 1][y]);
      if (y > 0) node.neighbors.push(clonedGrid[x][y - 1]);
      if (y < clonedGrid[0].length - 1) node.neighbors.push(clonedGrid[x][y + 1]);
    }
  }

  return clonedGrid;
}

export class Paths {
  private grid: TNode[][];

  constructor(width: number, height: number) {
    this.grid = Array.from({ length: width }, (_, x) =>
      Array.from({ length: height }, (_, y) => this.createNode(x, y))
    );

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        this.addNeighbors(this.grid[x][y], this.grid);
      }
    }
  }

  aStar(start: TNode, end: TNode, grid: TNode[][]): TNode[] {
    let openSet: TNode[] = [];
    let closedSet: TNode[] = [];
    openSet.push(start);

    while (openSet.length > 0) {
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) {
          lowestIndex = i;
        }
      }

      const current = openSet[lowestIndex];

      // Comprueba si el nodo actual es el nodo de destino
      if (current.x === end.x && current.y === end.y) {
        let path: TNode[] = [];
        let temp = current;
        while (temp.previous) {
          path.push(temp.previous);
          temp = temp.previous;
        }
        return path;
      }

      openSet = openSet.filter((el) => el !== current);
      closedSet.push(current);

      const neighbors = current.neighbors;
      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];

        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          const tempG = current.g + 1;

          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
            }
          } else {
            neighbor.g = tempG;
            openSet.push(neighbor);
          }

          neighbor.h = this.heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }

    return []; //No hay camino disponible
  }

  heuristic(nodeA: TNode, nodeB: TNode): number {
    return Math.abs(nodeA.x - nodeB.x) + Math.abs(nodeA.y - nodeB.y);
  }

  private createNode(x: number, y: number): TNode {
    return {
      x,
      y,
      f: 0,
      g: 0,
      h: 0,
      neighbors: [],
      previous: null,
      wall: false,
    };
  }

  private addNeighbors(node: TNode, grid: TNode[][]): void {
    const x = node.x;
    const y = node.y;
    if (x < grid.length - 1) {
      node.neighbors.push(grid[x + 1][y]);
    }
    if (x > 0) {
      node.neighbors.push(grid[x - 1][y]);
    }
    if (y < grid[0].length - 1) {
      node.neighbors.push(grid[x][y + 1]);
    }
    if (y > 0) {
      node.neighbors.push(grid[x][y - 1]);
    }
  }

  setNodeAsWall(x: number, y: number): void {
    if (this.grid[x] && this.grid[x][y]) {
      this.grid[x][y].wall = true;
    } else {
      throw new Error(`Node not found at position: (${x}, ${y})`);
    }
  }

  getPathsBetween({ x: x1, y: y1 }: TCoordinates, { x: x2, y: y2 }: TCoordinates): TNode[][] {
    let start = this.grid[x1][y1];
    let end = this.grid[x2][y2];

    let paths: TNode[][] = [];

    for (let i = 0; i < 5; i++) {
      let tempGrid = cloneGrid(this.grid);
      let newPath = this.aStar(start, end, tempGrid);

      if (newPath.length === 0) {
        break;
      }

      paths.push(newPath);
    }

    // Clasificar los caminos según su longitud
    paths.sort((a, b) => a.length - b.length);

    return paths;
  }
}
