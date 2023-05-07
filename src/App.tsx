import * as React from "react";
import { Box, ThemeProvider } from "theme-ui";
import { theme } from "./styles/theme";
import { Board, TOnClickCell } from "./components/Board";
import { CreepsContainer } from "./characters/CreepsContainer";
import { Compass } from "./components/Compass";
import { creepsStore } from "./characters/creepsStore";
import { useStartLog } from "./useStartLog";
import { plane } from "../util/plane";

export type TAppContext = { unit: number };

export const AppContext = React.createContext<TAppContext>({} as TAppContext);

const App: React.FC = () => {
  const appContext: TAppContext = { unit: 50 };
  useStartLog({ appContext, theme });

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={appContext}>
        <Box variant="layout.app">
          <Board
            onClickCell={React.useCallback((ev: TOnClickCell) => {
              const creep = creepsStore.make(1);
              creep.setPosition(plane.getPosition(ev.cell));
            }, [])}
            size={10}
            width={500}
          />
          <Compass />
          <CreepsContainer />
        </Box>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
