import { RefObject, useEffect, useState } from "react";

const defaultOptions: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: 1,
};

const useIntersection = (
  ref: RefObject<HTMLElement>,
  options?: IntersectionObserverInit
): IntersectionObserverEntry | null => {
  const newOptions = {
    ...defaultOptions,
    ...options,
  };

  const [
    intersectionObserverEntry,
    setIntersectionObserverEntry,
  ] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === "function") {
      const handler = (entries: IntersectionObserverEntry[]) => {
        setIntersectionObserverEntry(entries[0]);
      };

      const observer = new IntersectionObserver(handler, newOptions);
      observer.observe(ref.current);

      return () => {
        setIntersectionObserverEntry(null);
        observer.disconnect();
      };
    }
    // eslint-disable-next-line
    return () => {};
  }, [ref.current, newOptions.threshold, newOptions.root, newOptions.rootMargin]);

  return intersectionObserverEntry;
};

export default useIntersection;
