import * as React from "react";
import { Box, ThemeProvider } from "theme-ui";
import { theme } from "../styles/theme";
import { Board } from "../components/Board";
import { CreepsContainer } from "../characters/CreepsContainer";
import { Compass } from "../components/Compass";
import { useStartLog } from "../useStartLog";
import { usePathsFinder } from "./hooks/usePathsFinder";
import { Paths } from "../paths";
import { StagesMaker } from "./StagesMaker/StagesMaker";
import { boards } from "./boards";
import { loadStage } from "./StagesMaker/loadStage";

export type TAppContext = { boardSize: number; paths: Paths; unit: number };

export const AppContext = React.createContext<TAppContext>({} as TAppContext);

const currentBoard = boards.diagonal20;

const boardSize = currentBoard.length; //*/ 20;
const editionMode = true;
const screenBoardWidth = 550;

const App: React.FC = () => {
  const paths = usePathsFinder(boardSize);

  const appContext: TAppContext = { boardSize, paths, unit: screenBoardWidth / boardSize };

  React.useEffect(() => {
    loadStage(appContext, currentBoard);
  }, []);

  useStartLog({ appContext, currentBoard, theme });

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={appContext}>
        <Box variant="layout.app">
          <Board size={boardSize} width={screenBoardWidth} />
          <Compass />
          <CreepsContainer />
          {editionMode && <StagesMaker />}
        </Box>
      </AppContext.Provider>
    </ThemeProvider>
  );
};

export default App;
