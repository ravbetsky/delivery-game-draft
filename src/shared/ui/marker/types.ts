export type MarkerProps = {
  id: string;
  weight: number;
  onClick?: (id: string) => void
  onRemove?: (id: string) => void;
  onWeightChange?: (id: string, weight: number) => void;
};
