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

type TCreep = {
  color: string; // hex color format
  hp: number; // Between 100 and 10000
  movementSpeed: number; // Between 100 and 1500
  name: string;
};

const creepsLevels: TCreep[] = [
  { name: "Fuzzle", hp: 100, movementSpeed: 300, color: "#a8a878" },
  { name: "Glimmerbug", hp: 200, movementSpeed: 600, color: "#c6c6a7" },
  { name: "Vineclaw", hp: 300, movementSpeed: 150, color: "#a040a0" },
  { name: "Sparktail", hp: 400, movementSpeed: 400, color: "#a8b820" },
  { name: "Mudskipper", hp: 500, movementSpeed: 200, color: "#aa9" },
  { name: "Flarefang", hp: 600, movementSpeed: 700, color: "#f08030" },
  { name: "Icyspine", hp: 700, movementSpeed: 300, color: "#6890f0" },
  { name: "Thistlethorn", hp: 800, movementSpeed: 800, color: "#78c850" },
  { name: "Boulderback", hp: 900, movementSpeed: 450, color: "#e0c068" },
  { name: "Whirlwindwing", hp: 1000, movementSpeed: 500, color: "#98d8d8" },
  { name: "Cinderscale", hp: 1200, movementSpeed: 550, color: "#7038f8" },
  { name: "Duskstalker", hp: 1500, movementSpeed: 250, color: "#705898" },
  { name: "Thunderhoof", hp: 1800, movementSpeed: 900, color: "#f8d030" },
  { name: "Lavastrider", hp: 2100, movementSpeed: 350, color: "#e0c068" },
  { name: "Frostshard", hp: 2400, movementSpeed: 950, color: "#98d8d8" },
  { name: "Shadowmaw", hp: 2700, movementSpeed: 400, color: "#705898" },
  { name: "Crystalfury", hp: 3000, movementSpeed: 1000, color: "#b8a038" },
  { name: "Stormbreaker", hp: 3500, movementSpeed: 450, color: "#f8d030" },
  { name: "Dreadtalon", hp: 4000, movementSpeed: 1100, color: "#78c850" },
  { name: "Sunflare", hp: 4500, movementSpeed: 500, color: "#f85888" },
  { name: "Quakewarden", hp: 5000, movementSpeed: 1200, color: "#d0e0e0" },
  { name: "Abyssfang", hp: 5500, movementSpeed: 550, color: "#f8d030" },
];

export const creepsStore = new (class CreepsStore extends EventEmitter<TCreepsStoreEvents> {
  creeps: Creep[] = [];

  get(id: string) {
    return this.creeps.find((current) => current.id === id) as Creep;
  }

  make(level: number) {
    const newCreep = new Creep(
      creepsLevels[level].hp,
      creepsLevels[level].movementSpeed,
      creepsLevels[level].color
    );
    this.creeps.push(newCreep);
    this.emit("creepBorn", newCreep);
    newCreep.on("die", () => this.emit("creepDeath", { id: newCreep.id }));
    return newCreep;
  }
})();
