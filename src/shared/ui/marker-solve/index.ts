import { MarkerSolveProps } from "./types";

export function markerSolve({
  weight,
  isAvailable,
  isActive,
  isLast,
  onClick,
}: MarkerSolveProps) {
  const marker = document.createElement("div");
  marker.classList.add("marker-solve");
  marker.innerHTML = String(weight);

  if (!isAvailable && !isActive) {
    marker.classList.add("disable");
  }

  if (isActive) {
    marker.classList.add("active");
  }

  if (isLast) {
    marker.classList.add("current");
  }

  marker.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick?.();
  });

  return marker;
}
