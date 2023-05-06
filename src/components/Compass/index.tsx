import { memo, useMemo, useRef } from "react";
import { Box } from "theme-ui";

export const Compass = memo(() => {
  const ref = useRef<HTMLElement | null>(null);

  useMemo(() => {
    document.addEventListener("mousemove", (ev) => {
      if (ref.current) {
        const bound = ref.current.getBoundingClientRect();

        const center = { x: bound.left + bound.width / 2, y: bound.top + bound.height / 2 };

        const difference = { x: ev.clientX - center.x, y: ev.clientY - center.y };

        const phi = Math.atan2(difference.y, difference.x);

        ref.current.style.transform = `rotate(${phi + Math.PI / 2}rad)`;
      }
    });
  }, []);

  return <Box variant="layout.components.compass" ref={ref}></Box>;
});
