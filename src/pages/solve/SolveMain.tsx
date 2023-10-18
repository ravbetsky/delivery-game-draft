import React from "react";
import { useMapAPI } from "../../shared/lib/map/MapProvider.hooks";
import { markerSolve } from "../../shared/ui/marker-solve";
import { makePolyline } from "../editor/Editor.consts";
import { useSolve } from "./Solve.hook";
import { Connection, Level } from "../../entities/level/types";
import SolveUI from "./SolveUI";
import TimerUI from "./TimerUI";

const hasConnectionToPointFromPoint = (
  solveStack: string[],
  connections: Connection[],
  pointTo: string
) => {
  if (solveStack.length === 0) {
    return true;
  }
  const currentPoint = solveStack[solveStack.length - 1];
  const possibleConnections = connections.filter((connection) =>
    connection.some((c) => c === currentPoint)
  );
  return (
    possibleConnections.some((connection) =>
      connection.some((c) => c === pointTo)
    ) && solveStack.every((item) => item !== pointTo)
  );
};

function SolveMain({ level }: { level: Level }) {
  const { YMapMarker, YMapFeature } = useMapAPI();

  const { points, connections } = level;
  const { score, solveStack, popPoint, pushPoint } = useSolve();

  const solvePathCoords = solveStack.map(
    (item) => points.find((point) => point.id === item)!.coords!
  );
  const lastId = solveStack[solveStack.length - 1];

  return (
    <>
      <SolveUI score={score} />
      <TimerUI />
      <YMapFeature {...makePolyline(solvePathCoords, "#1cc052")} />
      {connections.map(
        (connection) =>
          connection.every((connectionId) =>
            points.some((point) => point.id === connectionId)
          ) && (
            <YMapFeature
              key={connection.join("")}
              {...makePolyline(
                connection.map(
                  (id) => points.find((point) => point.id === id)!.coords!
                ),
                "rgba(0,0,0,0.3)"
              )}
            />
          )
      )}
      {points.map((point) => (
        <YMapMarker
          key={point.id}
          coordinates={point.coords}
          markerElement={markerSolve({
            weight: point.weight,
            isAvailable: hasConnectionToPointFromPoint(
              solveStack,
              connections,
              point.id
            ),
            isActive: solveStack.includes(point.id),
            isLast: lastId === point.id,
            onClick: () =>
              lastId === point.id
                ? popPoint(point.weight)
                : pushPoint(point.id, point.weight),
          })}
        />
      ))}
    </>
  );
}

export default SolveMain;
