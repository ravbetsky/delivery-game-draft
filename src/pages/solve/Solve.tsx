import React, { useSyncExternalStore } from "react";
import { levelStore } from "../../entities/level/store";
import { useMapAPI } from "../../shared/lib/map/MapProvider.hooks";
import SolveMain from "./SolveMain";

function Solve() {
  const level = useSyncExternalStore(
    levelStore.subscribe,
    levelStore.getSnapshot
  )!;

  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
    useMapAPI();

  return (
    <YMap
      className="map"
      location={{ center: level?.center, zoom: level?.zoom, bounds: level?.bounds }}
      mode="vector"
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      <SolveMain level={level} />
    </YMap>
  );
}

export default Solve;
