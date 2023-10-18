import { LngLat } from "@yandex/ymaps3-types";

export type Coords = LngLat;

export type Point = {
  id: string;
  coords: Coords;
  weight: number;
};

export type Connection = [string, string];

export type Level = {
  points: Point[];
  connections: Connection[];
  bounds: [Coords, Coords];
  center: Coords;
  zoom: number;
};
