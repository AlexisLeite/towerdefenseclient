import { MutableRefObject, useCallback, useRef, useState } from "react";

export default function useMeasure(): [MutableRefObject<HTMLElement>, DOMRect | undefined] {
  const [measurement, setMeasurement] = useState<DOMRect | undefined>(undefined);
  const lastEl = useRef<HTMLElement | null>(null);

  const ref = useCallback((el: HTMLElement) => {
    if (lastEl.current !== el) {
      lastEl.current = el;
      setMeasurement(el?.getBoundingClientRect());
    }
  }, []);

  return [ref as unknown as MutableRefObject<HTMLElement>, measurement];
}
