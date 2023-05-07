import React from "react";
import { Theme } from "theme-ui";

export function useStartLog(props: any) {
  React.useMemo(() => {
    console.clear();
    console.log(props);
  }, []);
}
