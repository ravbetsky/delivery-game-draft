import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Reactify } from "@yandex/ymaps3-types/reactify";

import { MapContext } from "../../lib/map/context";

export function MapProvider({ children }: { children: React.ReactNode }) {
  const [value, setValue] = useState<Reactify>();

  useEffect(() => {
    async function reactifyAPI() {
      const ymaps3Reactify = await ymaps3.import("@yandex/ymaps3-reactify");
      return ymaps3Reactify.reactify.bindTo(React, ReactDOM);
    }
    reactifyAPI().then((reactify) => {
      setValue(reactify);
    });
  }, []);

  if (!value) {
    return <>Loading...</>;
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
}
