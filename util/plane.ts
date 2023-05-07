export type TCoordinates = {
  x: number;
  y: number;
};

/**
 * Permite acceder a diversas funciones relacionadas a la ubicación
 * y movimiento de elementos html en el plano.
 */
export const plane = new (class Plane {
  bound(el: HTMLElement) {
    return el.getBoundingClientRect();
  }

  distance(a: TCoordinates, b: TCoordinates) {
    const d = { x: a.x - b.x, y: a.y - b.y };
    return { length: Math.sqrt(d.x * d.x + d.y * d.y), ...d };
  }

  getPosition(element: HTMLElement) {
    const bound = this.bound(element);

    return { x: bound.left + bound.width / 2, y: bound.top + bound.height / 2 };
  }

  move(
    element: HTMLElement,
    destination: TCoordinates,
    movementSpeed: number,
    lastTimestamp?: number
  ) {
    if (lastTimestamp === undefined) this.move(element, destination, movementSpeed, Date.now());
    else
      requestAnimationFrame((time) => {
        const diff = time - lastTimestamp;
        const moveDistance = (diff / 1000) * movementSpeed;

        const position = this.getPosition(element);
        const distance = this.distance(position, destination);

        if (moveDistance <= distance.length) {
          this.setPosition(element, destination);
        } else {
          const x = (moveDistance / (distance.x + distance.y)) * distance.x;
          const y = (moveDistance / (distance.x + distance.y)) * distance.y;

          this.setPosition(element, { x, y });
          this.move(element, destination, movementSpeed, time);
        }
      });
  }

  setPosition(element: HTMLElement, position: TCoordinates) {
    const bound = this.bound(element);
    Object.assign(element.style, {
      left: position.x - bound.width / 2 + "px",
      top: position.y - bound.height / 2 + "px",
    });
  }
})();
