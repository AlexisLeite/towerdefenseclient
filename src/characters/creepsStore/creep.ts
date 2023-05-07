import { TCoordinates, plane } from "../../../util/plane";
import { Character } from "../character";

let maxCreep = 0;

export class Creep extends Character {
  constructor(maxHp: number, movementSpeed: number, color: string) {
    super(`creep${maxCreep++}`, maxHp, movementSpeed, color);
  }

  element: HTMLElement | null = null;
  el() {
    if (!this.element || !document.contains(this.element)) {
      this.element = document.getElementById(this.id);
      if (!this.element) throw new Error(`Can't find creep with id ${this.id}`);
    }

    return this.element;
  }

  init() {
    plane.setPosition(this.el(), this.position);
    this.emit("mount", null);
  }

  /**
   * Devuelve una promesa indicando si se completó el movimiento
   */
  #move(destination: TCoordinates) {
    this.position = destination;
    try {
      const result = plane.move(this.el(), destination, this.movementSpeed);
      return result;
    } catch (e) {}
    return new Promise((resolve) => resolve(false));
  }

  #isMoving = false;
  async move() {
    if (!this.#isMoving) {
      this.#isMoving = true;

      for await (let current of this.#path) {
        if (this.currentHp === 0) {
          this.#path = [];
          this.#isMoving = false;
          return false;
        } else {
          await this.#move(current);
        }
      }

      this.#path = [];
      this.#isMoving = false;
    }

    return true;
  }

  #path: TCoordinates[] = [];
  async path(destination: TCoordinates) {
    this.#path.push(destination);
  }
}
