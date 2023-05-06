type TCoordinates = {
  x: number;
  y: number;
};

/**
 * Permite acceder a diversas funciones relacionadas a la ubicación
 * y movimiento de elementos html en el plano.
 */
export const plane = new (class Plane {
  #distance(a: TCoordinates, b: TCoordinates) {
    const d = { x: a.x - b.x, y: a.y - b.y };
    return Math.sqrt(d.x * d.x + d.y * d.y);
  }

  #getPosition(element: HTMLElement) {
    const bound = element.getBoundingClientRect();

    return { x: bound.left + bound.width / 2, y: bound.top + bound.height / 2 };
  }

  move(element: HTMLElement, x: number, y: number, movementSpeed: number, lastTimestamp?: number) {
    if (lastTimestamp === undefined) this.move(element, x, y, movementSpeed, Date.now());
    else
      requestAnimationFrame((time) => {
        const diff = time - lastTimestamp;
        const bound = element.getBoundingClientRect();

        const position = this.#getPosition(element);
        const distance = this.#distance(position, { x, y });
      });
  }
})();
