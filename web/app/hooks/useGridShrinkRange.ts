// hooks/useGridShrinkRange.ts
import { useEffect, useState } from "react";

const LOGO_RATIO = 744 / 191;

export function useGridShrinkRange(
  startVar: string,
  endVar: string,
  ready: boolean,
  version: number, // nouveau
) {
  const [state, setState] = useState<{
    range: number;
    startWidth: number;
    endWidth: number;
  } | null>(null);

  useEffect(() => {
    if (!ready) return;
    const styles = getComputedStyle(document.documentElement);
    const startWidth = parseFloat(styles.getPropertyValue(startVar));
    const endWidth = parseFloat(styles.getPropertyValue(endVar));
    const range = startWidth / LOGO_RATIO - endWidth / LOGO_RATIO;
    setState({ range, startWidth, endWidth });
  }, [startVar, endVar, ready, version]);

  return state;
}
