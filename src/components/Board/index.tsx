import { Fragment, MouseEvent, useCallback, useMemo } from "react";
import { Box, ThemeUICSSObject } from "theme-ui";
import useMeasure from "../../../hooks/useMeasure";
import EventEmitter from "../../../util/eventEmitter";

export type TOnClickCell = {
  cell: HTMLElement;
  column: number;
  row: number;
};

export const boardEvents = new (class BoardEvents extends EventEmitter<{
  click: TOnClickCell;
  mousedown: TOnClickCell;
  mouseup: TOnClickCell;
  mouseenter: TOnClickCell;
}> {})();

const Board = ({
  onClickCell,
  size,
  width,
}: {
  onClickCell?: (ev: TOnClickCell) => unknown;
  size: number;
  width: number;
}) => {
  const cells = useMemo(
    () =>
      new Array(size).fill(1).map((_, i) => (
        <Fragment key={i}>
          {new Array(size).fill(1).map((_, j) => (
            <Box
              className="board__cell"
              data-row={i}
              data-column={j}
              key={j}
              onMouseEnter={(ev: MouseEvent<HTMLElement>) => {
                const cell = (ev.target as HTMLElement).closest<HTMLElement>(".board__cell");

                if (cell) {
                  const event = {
                    cell,
                    column: Number(cell.dataset.column),
                    row: Number(cell.dataset.row),
                  };
                  boardEvents.emit("mouseenter", event);
                }
              }}
            ></Box>
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
      onMouseDown={useCallback((ev: MouseEvent<HTMLElement>) => {
        const cell = (ev.target as HTMLElement).closest<HTMLElement>(".board__cell");

        if (cell) {
          const event = {
            cell,
            column: Number(cell.dataset.column),
            row: Number(cell.dataset.row),
          };
          boardEvents.emit("mousedown", event);
        }
      }, [])}
      onMouseUp={useCallback((ev: MouseEvent<HTMLElement>) => {
        const cell = (ev.target as HTMLElement).closest<HTMLElement>(".board__cell");

        if (cell) {
          const event = {
            cell,
            column: Number(cell.dataset.column),
            row: Number(cell.dataset.row),
          };
          boardEvents.emit("mouseup", event);
        }
      }, [])}
      onClick={useCallback((ev: MouseEvent<HTMLElement>) => {
        const cell = (ev.target as HTMLElement).closest<HTMLElement>(".board__cell");

        if (cell) {
          const event = {
            cell,
            column: Number(cell.dataset.column),
            row: Number(cell.dataset.row),
          };
          onClickCell?.(event);
          boardEvents.emit("click", event);
        }
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
