import { useMemo, useState } from "react";
import { CreepElement } from "./CreepElement";
import { creepsStore } from "./creepsStore";
import { Creep } from "./creepsStore/creep";

export const CreepsContainer = () => {
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
  }, []);

  return (
    <>
      {creeps.map((current) => (
        <CreepElement key={current.id} creep={current} />
      ))}
    </>
  );
};
