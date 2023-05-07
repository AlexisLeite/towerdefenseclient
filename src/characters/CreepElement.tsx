import { useContext, useEffect, useMemo, useState } from "react";
import { Box } from "theme-ui";
import { Creep } from "./creepsStore/creep";
import { AppContext } from "../main/App";

export const CreepElement = ({ creep }: { creep: Creep }) => {
  const context = useContext(AppContext);

  const sx = useMemo(
    () => ({
      background: creep.color,
      height: context.unit * creep.size + "px",
      width: context.unit * creep.size + "px",

      ".creep__currentLife": {
        width: (100 * creep.currentHp) / creep.maxHp + "%",
      },
    }),
    []
  );

  useEffect(() => {
    creep.init();
  }, []);

  return (
    <Box className="creep" id={creep.id} sx={sx} variant="layout.characters.creep">
      <Box className="creep__lifeBar">
        <Box className="creep__currentLife"></Box>
      </Box>
      <Box className="creep__body"></Box>
    </Box>
  );
};
