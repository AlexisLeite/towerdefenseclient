import { useMemo, useState } from "react";
import { Box } from "theme-ui";
import { getIndex } from "./../../util/getIndex";

export type TCreep = {
  id: string;
  maxHp: number;
  movementSpeed: number;
};

export const Creep = (props: TCreep) => {
  const [hp, setHp] = useState(props.maxHp);
  const [movementSpeed, setMovementSpeed] = useState(props.movementSpeed);

  const sx = useMemo(() => ({ background: getIndex(["red"], [true]) }), []);
  const sxLifebar = useMemo(() => ({ width: (100 * hp) / props.maxHp + "%" }), []);

  return (
    <Box className="creep" id={props.id} sx={sx} variant="layout.characters.creep">
      <Box className="creep__lifeBar">
        <Box className="creep__currentLife" sx={sxLifebar}></Box>
      </Box>
      <Box className="creep__body"></Box>
    </Box>
  );
};
