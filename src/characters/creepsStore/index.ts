import EventEmitter from "../../../util/eventEmitter";
import { Creep } from "./creep";

export type TCreepMove = {
  id: string;
  x: number;
  y: number;
};

export type TCreepsStoreEvents = {
  creepBorn: Creep;
  creepDeath: { id: string };
};

const creepsLevels: Record<number, Pick<Creep, "maxHp" | "movementSpeed">> = {
  1: { maxHp: 10, movementSpeed: 10 },
};

export const creepsStore = new (class CreepsStore extends EventEmitter<TCreepsStoreEvents> {
  creeps: Creep[] = [];

  make(level: keyof typeof creepsLevels) {
    const newCreep = new Creep(creepsLevels[level].maxHp, creepsLevels[level].movementSpeed);
    this.creeps.push(newCreep);
    this.emit("creepBorn", newCreep);
    return newCreep;
  }
})();
