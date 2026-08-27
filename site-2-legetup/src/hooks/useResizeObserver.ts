import { useEffect, useRef, useState } from 'react';

interface Dimensions {
  width: number;
  height: number;
}

export function useResizeObserver<T extends HTMLElement>() {
  const elementRef = useRef<T | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Initial measurement
    const { width, height } = element.getBoundingClientRect();
    setDimensions({ width, height });

    if (typeof ResizeObserver !== 'undefined') {
      const resizeObserver = new ResizeObserver((entries) => {
        if (!entries || !entries.length) return;
        const entry = entries[0];
        if (entry.contentRect) {
          setDimensions({
            width: Math.round(entry.contentRect.width),
            height: Math.round(entry.contentRect.height),
          });
        }
      });

      resizeObserver.observe(element);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, []);

  return [elementRef, dimensions] as const;
}
