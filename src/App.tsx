import * as React from "react";
import { Box, ThemeProvider } from "theme-ui";
import { theme } from "./styles/theme";
import { Board, TOnClickCell } from "./components/Board";
import { CreepsContainer } from "./characters/CreepsContainer";
import { Compass } from "./components/Compass";

const Context = React.createContext<{ count: number }>({ count: 0 });

const C = () => {
  const { count } = React.useContext(Context);

  return <>Hello {count}</>;
};

const App: React.FC = () => {
  const [count, setCount] = React.useState(0);

  const contextValue = { count };

  React.useMemo(() => {
    console.clear();
    console.log({ theme });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Context.Provider value={contextValue}>
        <Box variant="layout.app">
          <Board
            onClickCell={React.useCallback((ev: TOnClickCell) => {
              console.log(ev);
            }, [])}
            size={10}
            width={500}
          />
          <Compass />
          <CreepsContainer />
        </Box>
      </Context.Provider>
    </ThemeProvider>
  );
};

export default App;
