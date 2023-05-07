import EventEmitter from "../../../util/eventEmitter";
import { Creep } from "./creep";

export type TCharacterMove = {
  id: string;
  x: number;
  y: number;
};

export type TCreepsStoreEvents = {
  creepBorn: Creep;
  creepDeath: { id: string };
};

const creepsLevels: Record<number, Pick<Creep, "maxHp" | "movementSpeed">> = {
  1: { maxHp: 10, movementSpeed: 150 },
};

export const creepsStore = new (class CreepsStore extends EventEmitter<TCreepsStoreEvents> {
  creeps: Creep[] = [];

  get(id: string) {
    return this.creeps.find((current) => current.id === id) as Creep;
  }

  make(level: keyof typeof creepsLevels) {
    const newCreep = new Creep(creepsLevels[level].maxHp, creepsLevels[level].movementSpeed);
    this.creeps.push(newCreep);
    this.emit("creepBorn", newCreep);
    return newCreep;
  }
})();
