import { Theme } from "theme-ui";
import { layout } from "./layout";
import { colors } from "./colors";
import { sizes } from "./sizes";

export const theme: Theme = {
  colors,
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "arial",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: "normal",
    caps: "0.2em",
  },
  layout,
  sizes,
  styles: {
    root: {
      button: {
        cursor: "pointer",
      },
    },
  },
};
