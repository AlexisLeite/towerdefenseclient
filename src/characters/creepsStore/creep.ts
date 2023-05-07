import { TCoordinates, plane } from "../../../util/plane";
import { Character } from "../character";

let maxCreep = 0;

export class Creep extends Character {
  id = `creep${maxCreep++}`;

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
  }

  /**
   * Devuelve una promesa indicando si se completó el movimiento
   */
  move(destination: TCoordinates) {
    this.position = destination;
    try {
      const result = plane.move(this.el(), destination, this.movementSpeed);
      return result;
    } catch (e) {}
    return new Promise((resolve) => resolve(false));
  }

  #isMoving = false;
  #path: TCoordinates[] = [];
  async path(destination: TCoordinates) {
    this.#path.push(destination);
    if (!this.#isMoving) {
      this.#isMoving = true;

      for await (let current of this.#path) {
        await this.move(current);
      }

      this.#isMoving = false;
    }
  }
}
