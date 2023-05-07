import { Box } from "theme-ui";
import { Toolbar } from "./Toolbar";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TOnClickCell, boardEvents } from "../../components/Board";
import { AppContext } from "../App";
import { getCellElement } from "../../components/Board/util";
import { diagonal20 } from "../boards/diagonal20";

export type TTool = "void" | "startPoint" | "endPoint" | "wallLine";
export type TStagesMakerContext = {
  currentTool: TTool;
  exportBoard: () => void;
  setCurrentTool: Dispatch<SetStateAction<TTool>>;
};
export type TBoardState = TTool[][];

export const StagesMakerContext = createContext<TStagesMakerContext>({} as TStagesMakerContext);

export const StagesMaker = () => {
  const appContext = useContext(AppContext);
  const currentBoard = useRef<TBoardState>(diagonal20);

  const [currentTool, setCurrentTool] = useState<TTool>("wallLine");

  const exportBoard = useCallback(() => {
    console.log(JSON.stringify(currentBoard.current));
  }, []);
  const contextValue = useMemo<TStagesMakerContext>(
    () => ({
      currentTool,
      exportBoard,
      setCurrentTool,
    }),
    [currentTool]
  );
  const isMouseDown = useRef(false);
  const selectedCell = useRef<TOnClickCell | null>(null);

  useEffect(() => {
    function markCell(ev: TOnClickCell) {
      const classes = ["endPoint", "startPoint", "wallLine"];
      classes.forEach((current) => ev.cell.classList.remove(current));

      switch (currentBoard.current[ev.row][ev.column]) {
        case "endPoint":
          ev.cell.classList.add("endPoint");
          break;
        case "startPoint":
          ev.cell.classList.add("startPoint");
          break;
        case "wallLine":
          if (!selectedCell.current) {
            selectedCell.current = ev;
          } else {
            if (selectedCell.current.row === ev.row) {
              for (let i = selectedCell.current.column; i <= ev.column; i++) {
                currentBoard.current[ev.row][i] = "wallLine";

                const cell = getCellElement({ y: ev.row, x: i });
                cell?.classList.add("wallLine");
              }
            } else if (selectedCell.current.column === ev.column) {
              for (let i = selectedCell.current.row; i <= ev.row; i++) {
                currentBoard.current[i][ev.column] = "wallLine";

                const cell = getCellElement({ x: ev.column, y: i });
                cell?.classList.add("wallLine");
              }
            }
            selectedCell.current = null;
          }
          break;
        case "void":
          break;
      }
    }

    const u = [
      boardEvents.on("mousedown", (ev) => {
        currentBoard.current[ev.row][ev.column] = currentTool;
        markCell(ev);
        isMouseDown.current = true;
      }),
      boardEvents.on("mouseup", (ev) => {
        isMouseDown.current = false;
      }),
      boardEvents.on("mouseenter", (ev) => {
        console.log("enter");
        if (isMouseDown.current && currentTool !== "wallLine") {
          currentBoard.current[ev.row][ev.column] = currentTool;
          markCell(ev);
        }
      }),
    ];

    return () => u.forEach((c) => c());
  }, [currentTool]);

  return (
    <StagesMakerContext.Provider value={contextValue}>
      <Box className="stagesMaker" variant="layout.app.stagesMaker">
        <Toolbar />
      </Box>
    </StagesMakerContext.Provider>
  );
};
