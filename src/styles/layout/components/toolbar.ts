import { ThemeUICSSObject } from "theme-ui";

export const toolbar: ThemeUICSSObject = {
  display: "flex",
  gap: 1,
  p: 1,

  ".toolbar__button.selected": {
    background: "toolbarButtonSelected",
  },
};
