import { MouseEvent, useCallback, useMemo, useRef, useState } from "react";
import { CreepElement } from "./CreepElement";
import { creepsStore } from "./creepsStore";
import { Creep } from "./creepsStore/creep";
import { Box } from "theme-ui";

type TCreepsContainer = {};

export const CreepsContainer = ({}: TCreepsContainer) => {
  const [creeps, setCreeps] = useState<Creep[]>([]);

  useMemo(() => {
    const unsuscribers = [
      creepsStore.on("creepBorn", (creep) => {
        setCreeps((current) => [...current, creep]);
      }),
      creepsStore.on("creepDeath", ({ id }) => {
        setCreeps((current) => [...current.filter((search) => search.id !== id)]);
      }),
    ];

    return () => unsuscribers.forEach((unsuscribe) => unsuscribe());
  }, []);

  return (
    <Box className="creeps__container">
      {creeps.map((current) => (
        <CreepElement key={current.id} creep={current} />
      ))}
    </Box>
  );
};
