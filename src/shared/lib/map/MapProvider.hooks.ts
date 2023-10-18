import { useContext } from "react";
import { MapContext } from "./context";

export function useMapAPI() {
  const reactify = useContext(MapContext);

  if (!reactify) {
    throw "ymaps API is not loaded";
  }

  return reactify.module(ymaps3);
}
