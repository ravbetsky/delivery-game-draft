import { Reactify } from "@yandex/ymaps3-types/reactify";
import React from "react";

export const MapContext = React.createContext<Reactify | null>(null);
