import { LngLat, YMapFeatureProps } from "@yandex/ymaps3-types";
import { Coords } from "../../entities/level/types";

export const makePolyline = (
  coords: Coords[],
  color: string
): YMapFeatureProps => {
  return {
    geometry: {
      type: "LineString",
      coordinates: coords,
    },
    style: { stroke: [{ color, width: 4 }] },
  };
};

export const getMidpoint = (coordA: LngLat, coordB: LngLat): LngLat => {
  return [(coordA[0] + coordB[0]) / 2, (coordA[1] + coordB[1]) / 2];
};
