import { useContext } from "react";
import { Box, Button } from "theme-ui";
import { StagesMakerContext } from "./StagesMaker";

export const Toolbar = () => {
  const { currentTool, exportBoard, setCurrentTool } = useContext(StagesMakerContext);

  return (
    <Box className="toolbar" variant="layout.components.toolbar">
      <Button
        onClick={() => {
          setCurrentTool("void");
        }}
        className={`toolbar__button ${currentTool === "void" ? "selected" : ""}`}
      >
        Erase
      </Button>
      <Button
        onClick={() => {
          setCurrentTool("startPoint");
        }}
        className={`toolbar__button ${currentTool === "startPoint" ? "selected" : ""}`}
      >
        StartPoint
      </Button>
      <Button
        onClick={() => {
          setCurrentTool("endPoint");
        }}
        className={`toolbar__button ${currentTool === "endPoint" ? "selected" : ""}`}
      >
        EndPoint
      </Button>
      <Button
        onClick={() => {
          setCurrentTool("wallLine");
        }}
        className={`toolbar__button ${currentTool === "wallLine" ? "selected" : ""}`}
      >
        WallLine
      </Button>
      <Button onClick={exportBoard} className={`toolbar__button`}>
        Export
      </Button>
    </Box>
  );
};
