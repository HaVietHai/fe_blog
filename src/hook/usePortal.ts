import { useEffect, useState } from "react";

export function usePortal(id: string) {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    }
    setElement(el);
    return () => {
      el?.remove();
    };
  }, [id]);

  return element;
}
