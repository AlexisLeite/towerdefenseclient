import { ThemeUICSSObject } from "theme-ui";

export const creep: ThemeUICSSObject = {
  borderRadius: "10000px",
  position: "relative",

  ".creep__lifeBar": {
    background: "creepLifebarBackground",
    border: "1px solid",
    borderColor: "creepLifebarBorder",
    height: "creepLifebarHeight",
    width: "creepLifebarWidth",

    position: "absolute",
    left: "-50%",
    top: "-5px",

    ".creep__currentLife": {
      background: "creepLifebarBackgroundFilled",
    },
  },
};
