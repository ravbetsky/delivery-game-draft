import { MarkerProps } from "./types";

export function marker({
  id,
  weight,
  onClick,
  onRemove,
  onWeightChange,
}: MarkerProps) {
  const marker = document.createElement("div");
  marker.classList.add("marker");
  marker.style.color = "#fefefe";
  const weightInput = document.createElement("input");
  const removeBtn = document.createElement("div");
  removeBtn.classList.add("marker-remove");
  removeBtn.innerHTML = "x";
  marker.appendChild(weightInput);
  marker.appendChild(removeBtn);

  marker.addEventListener("click", (e) => {
    e.stopPropagation();
    onClick?.(id);
  });

  weightInput.value = String(weight);
  //   weightInput.disabled = true;
  weightInput.addEventListener("click", (e) => {
    e.stopPropagation()
  })
  weightInput.addEventListener("change", (e) => {
    // e.stopPropagation();
    const newWeight = (e.target as HTMLInputElement).value;
    onWeightChange?.(id, Number(newWeight));
  });

  removeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    onRemove?.(id);
  });

  return marker;
}
