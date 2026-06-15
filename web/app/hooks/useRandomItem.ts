import { useEffect, useState } from "react";

export function useRandomItem<T>(items: T[] | null | undefined): T | undefined {
  const [randomItem, setRandomItem] = useState<T>();

  useEffect(() => {
    if (!items?.length) {
      setRandomItem(undefined);
      return;
    }

    const index = Math.floor(Math.random() * items.length);
    setRandomItem(items[index]);
  }, [items]);

  return randomItem;
}
