import { useMemo, useState } from "react";
import { Creep, TCreep } from "./Creep";
import { creepsStore } from "./creepsStore";

export const CreepsContainer = () => {
  const [creeps, setCreeps] = useState<TCreep[]>([]);

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
        <Creep key={current.id} {...current} />
      ))}
    </>
  );
};
