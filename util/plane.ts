/**
 * Coordenadas reales que representa un punto en el plano
 */
export type TCoordinates = {
  x: number;
  y: number;
};
/**
 * Coordenadas integrales que representan una celda en el tablero
 */
export type TBoardCoordinates = {
  x: number;
  y: number;
};

let lastAnimation = 0;
function getAnimationId() {
  if (lastAnimation > 1000000) lastAnimation = 0;
  return String(lastAnimation++);
}

/**
 * Permite acceder a diversas funciones relacionadas a la ubicación
 * y movimiento de elementos html en el plano.
 */
export const plane = new (class Plane {
  bound(el: HTMLElement) {
    return el.getBoundingClientRect();
  }

  coordinates(element: HTMLElement) {
    const bound = this.bound(element);

    return { x: bound.left + bound.width / 2, y: bound.top + bound.height / 2 };
  }

  distance(a: TCoordinates, b: TCoordinates) {
    const d = { x: a.x - b.x, y: a.y - b.y };
    return { length: Math.sqrt(d.x * d.x + d.y * d.y), ...d };
  }

  move(
    element: HTMLElement,
    destination: TCoordinates,
    movementSpeed: number,
    lastTimestamp?: number,
    animationId?: string
  ) {
    return new Promise<boolean>((resolve) => {
      if (animationId === undefined) {
        animationId = getAnimationId();
        element.dataset.animationId = animationId;
      }

      if (element.dataset.animationId !== animationId) {
        resolve(false);
        return;
      }

      requestAnimationFrame((time) => {
        (async () => {
          if (!lastTimestamp) {
            const result = this.move(element, destination, movementSpeed, time, animationId);
            resolve(result);
            return;
          }
          const diff = time - lastTimestamp;
          const moveDistance = (diff / 1000) * movementSpeed;

          const position = this.coordinates(element);
          const distance = this.distance(position, destination);

          if (moveDistance >= distance.length) {
            this.setPosition(element, destination);
            resolve(true);
          } else {
            const mx = (moveDistance / (Math.abs(distance.x) + Math.abs(distance.y))) * distance.x;
            const my = (moveDistance / (Math.abs(distance.x) + Math.abs(distance.y))) * distance.y;

            this.setPosition(element, { x: position.x - mx, y: position.y - my });
            const result = await this.move(element, destination, movementSpeed, time, animationId);
            resolve(result);
          }
        })();
      });
    });
  }

  setPosition(element: HTMLElement, position: TCoordinates) {
    const bound = this.bound(element);
    element.style.left = "0";
    element.style.top = "0";
    element.style.transform = `translate(${position.x - bound.width / 2 + "px"}, ${
      position.y - bound.height / 2 + "px"
    }) translateZ(1px)`;
  }
})();
