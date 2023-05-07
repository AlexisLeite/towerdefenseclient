import { useCallback } from "react";

export function useOnClickContainer(/* selectedCreep: MutableRefObject<Creep | null> */) {
  return useCallback((ev: React.MouseEvent) => {
    /* if (!selectedCreep.current)
      selectedCreep.current = creepsStore.get(
        (ev.target as HTMLElement).closest<HTMLElement>(".creep")?.id as string
      ); */
  }, []);
}
