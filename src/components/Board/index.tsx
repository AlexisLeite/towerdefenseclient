import { Fragment, MouseEvent, useCallback, useMemo } from "react";
import { Box, ThemeUICSSObject } from "theme-ui";
import useMeasure from "../../../hooks/useMeasure";

export type TOnClickCell = {
  cell: HTMLElement;
  column: number;
  row: number;
};

const Board = ({
  onClickCell,
  size,
  width,
}: {
  onClickCell: (ev: TOnClickCell) => unknown;
  size: number;
  width: number;
}) => {
  const cells = useMemo(
    () =>
      new Array(size).fill(1).map((_, i) => (
        <Fragment key={i}>
          {new Array(size).fill(1).map((_, j) => (
            <Box className="board__cell" data-row={i} data-column={j} key={j}></Box>
          ))}
        </Fragment>
      )),
    []
  );

  const [ref, measure] = useMeasure();

  const girdSx = useMemo<ThemeUICSSObject>(
    () => ({
      gridTemplateColumns: `repeat(${size}, 1fr)`,
      width: width + "px",

      ".board__cell": {
        height: `${(measure?.width ?? 0) / size}px`,
      },
    }),
    [measure]
  );

  return (
    <Box
      className="board"
      onClick={useCallback((ev: MouseEvent<HTMLElement>) => {
        const cell = (ev.target as HTMLElement).closest<HTMLElement>(".board__cell");

        if (cell)
          onClickCell?.({
            cell,
            column: Number(cell.dataset.column),
            row: Number(cell.dataset.row),
          });
      }, [])}
      ref={ref}
      sx={girdSx}
      variant="layout.components.board"
    >
      {cells}
    </Box>
  );
};

export { Board };
