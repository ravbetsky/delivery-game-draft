import { RemoveLineMarkerProps } from "./types";

export function markerRemoveLine({ connection, onClick }: RemoveLineMarkerProps) {
  const removeBtn = document.createElement("div");
  removeBtn.classList.add("remove-line-marker");
  removeBtn.innerHTML = "x";

  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick?.(connection);
  });

  return removeBtn;
}
