import * as React from "react";
import { Box, ThemeProvider } from "theme-ui";
import { theme } from "../styles/theme";
import { Board } from "../components/Board";
import { CreepsContainer } from "../characters/CreepsContainer";
import { Compass } from "../components/Compass";
import { useStartLog } from "../useStartLog";
import { useOnClickCell } from "./hooks/useOnClickCell";
import { useOnClickContainer } from "./hooks/useOnClickContainer";
import { usePathsFinder } from "./hooks/usePathsFinder";
import { Paths } from "../paths";
import { Stage } from "../stages/Stage";
import { getCellElement } from "../components/Board/util";
import { someHorizontalBars } from "./stagesMakersFunctions/someHorizontalBars";

export type TAppContext = { boardSize: number; paths: Paths; unit: number };

export const AppContext = React.createContext<TAppContext>({} as TAppContext);

const boardSize = 40;
const screenBoardWidth = 650; //px

const App: React.FC = () => {
  const paths = usePathsFinder(boardSize);

  const appContext: TAppContext = { boardSize, paths, unit: screenBoardWidth / boardSize };

  const onClickContainer = useOnClickContainer();
  const onClickCell = useOnClickCell(appContext);

  useStartLog({ appContext, theme });

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={appContext}>
        <Box variant="layout.app" onClick={onClickContainer}>
          <Board onClickCell={onClickCell} size={boardSize} width={screenBoardWidth} />
          <Compass />
          <CreepsContainer />
        </Box>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
