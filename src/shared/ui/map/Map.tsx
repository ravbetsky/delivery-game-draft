import React from "react";
import { useMapAPI } from "../../lib/map/MapProvider.hooks";
import { Mode } from "../../../types";

function Map({ children }: { children: React.ReactNode; mode: Mode }) {
  const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer } =
    useMapAPI();

  return (
    <YMap
      className="map"
      location={{ center: [37.618423, 55.751244], zoom: 12 }}
      mode="vector"
      // @ts-ignore
      ref={(x) => (window.mapInstance = x)}
    >
      <YMapDefaultSchemeLayer />
      <YMapDefaultFeaturesLayer />
      {children}
    </YMap>
  );
}

export default Map;
