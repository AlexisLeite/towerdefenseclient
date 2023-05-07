import React from "react";
import { Theme } from "theme-ui";

export function useStartLog(props: any) {
  React.useMemo(() => {
    console.log(props);
  }, []);
}
