import { useSyncExternalStore } from "react";

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export function useDarkMode() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
