import { ThemeUICSSObject } from "theme-ui";

export const board: ThemeUICSSObject = {
  background: "boardBackground",
  border: "2px solid",
  display: "grid",
  mx: "auto",
  width: "90vw",

  ".board__cell": {
    border: "1px solid",
    borderColor: "cellBorder",

    "&:hover": {
      background: "cellBackgroundHover",
      cursor: "pointer",
    },
  },

  ".path": {
    backgroundColor: "orange",
  },
  ".destination": {
    backgroundColor: "green",
  },
  ".origin": {
    backgroundColor: "red",
  },

  ".wall": { backgroundColor: "#333" },
};
