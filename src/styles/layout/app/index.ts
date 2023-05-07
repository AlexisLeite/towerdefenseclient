import { ThemeUICSSObject } from "theme-ui";
import { stagesMaker } from "./stagesMaker";

export const app: ThemeUICSSObject = {
  alignItems: "center",
  display: "flex",
  height: "100vh",
  justifyContent: "center",
  width: "100vw",

  stagesMaker,
};
