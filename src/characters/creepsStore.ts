export type TCreepMove = {
  id: string;
  x: number;
  y: number;
};

export type TCreepsStoreEvents = {
  creepBorn: TCreep;
  creepDeath: { id: string };
};

export type TCreepEvents = {
  move: TCreepMove;
  position: TCreepMove;
};

let maxCreep = 0;

class Creep extends EventEmitter<TCreepEvents> implements TCreep {
  id = `creep${maxCreep++}`;
  position = [0, 0, 0];

  constructor(public maxHp: number, public movementSpeed: number) {
    super();
  }

  #element: HTMLElement | null = null;
  #el() {
    if (!this.#element) {
      this.#element = document.getElementById(this.id);
      if (!this.#element) throw new Error(`Can't find creep with id ${this.id}`);
    }

    return this.#element;
  }

  move(x: number, y: number, lastTimestamp?: number) {
    requestAnimationFrame((time) => {
      if (lastTimestamp !== undefined) {
      }

      this.move(x, y, time);
    });
  }
}

const creepsLevels: Record<number, Omit<TCreep, "id">> = {
  1: { maxHp: 10, movementSpeed: 10 },
};

export const creepsStore = new (class CreepsStore extends EventEmitter<TCreepsStoreEvents> {
  creeps: Creep[] = [];

  make(level: keyof typeof creepsLevels) {
    const newCreep = new Creep(creepsLevels[level].maxHp, creepsLevels[level].movementSpeed);
    this.creeps.push(newCreep);
  }
})();

import EventEmitter from "./../../util/eventEmitter";
import { TCreep } from "./Creep";
