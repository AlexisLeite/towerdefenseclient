import { ThemeUICSSObject } from "theme-ui";

export const creep: ThemeUICSSObject = {
  borderRadius: "10000px",
  position: "fixed",

  ".creep__lifeBar": {
    background: "creepLifebarBackground",
    border: "1px solid",
    borderColor: "creepLifebarBorder",
    height: "creepLifebarHeight",
    width: "100%",

    position: "absolute",
    top: "-10px",

    ".creep__currentLife": {
      background: "creepLifebarBackgroundFilled",
      height: "100%",
    },
  },
};
