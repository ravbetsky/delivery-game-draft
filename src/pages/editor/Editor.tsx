import React, { useCallback, useState, useSyncExternalStore } from "react";
import { useMapAPI } from "../../shared/lib/map/MapProvider.hooks";
import { levelStore } from "../../entities/level/store";
import { useConnections, usePoints } from "./Editor.hooks";
import { marker } from "../../shared/ui/marker";
import { makePolyline, getMidpoint } from "./Editor.consts";
import { nanoid } from "nanoid";
import { markerRemoveLine } from "../../shared/ui/remove-line-marker";

function Editor() {
  const level = useSyncExternalStore(
    levelStore.subscribe,
    levelStore.getSnapshot
  );
  const { YMapListener, YMapMarker, YMapFeature } = useMapAPI();
  const [connectionToCoords, setConnectionToCoords] = useState();
  const [connectionFrom, setConnectionFrom] = useState<string>();
  const { points, addPoint, updatePoint, removePoint } = usePoints(
    level?.points
  );
  const { connections, addConnection, removeConnection } = useConnections(
    level?.connections
  );
  const handleSaveLevel = useCallback(() => {
    levelStore.addLevel({
      connections: connections.map((connection) => connection.sort()),
      points: points,
      //   @ts-ignore
      zoom: window.mapInstance.zoom!,
      //   @ts-ignore
      bounds: window.mapInstance.bounds!,
      //   @ts-ignore
      center: window.mapInstance.center!,
    });
  }, [connections, points]);

  const handleCreateConnection = useCallback(
    (id: string) => {
      const clickedPoint = points.find((point) => point.id === id)!;
      if (!connectionFrom) {
        setConnectionFrom(clickedPoint.id);
      } else {
        setConnectionFrom(undefined);
        if (clickedPoint.id !== connectionFrom) {
          addConnection([connectionFrom, clickedPoint.id]);
          setConnectionFrom(undefined);
          setConnectionToCoords(undefined);
        }
      }
    },
    [addConnection, connectionFrom, points]
  );

  return (
    <>
      <button onClick={handleSaveLevel}>Сохранить уровень</button>
      {connectionFrom && (
        <YMapListener
          // @ts-ignore
          onPointerMove={(_, data) => setConnectionToCoords(data.coordinates)}
        />
      )}
      {connectionFrom && connectionToCoords && (
        <YMapFeature
          {...makePolyline(
            [
              points.find((point) => point.id === connectionFrom)!.coords!,
              connectionToCoords,
            ],
            "rgba(0,0,0,0.2)"
          )}
        />
      )}
      {connections.map(
        (connection) =>
          connection.every((connectionId) =>
            points.some((point) => point.id === connectionId)
          ) && (
            <YMapMarker
              key={connection.join("")}
              markerElement={markerRemoveLine({
                connection,
                onClick: (connection) => removeConnection(connection),
              })}
              coordinates={getMidpoint(
                points.find((point) => point.id === connection[0])!.coords!,
                points.find((point) => point.id === connection[1])!.coords!
              )}
            />
          )
      )}
      {connections.map(
        (connection) =>
          connection.every((connectionId) =>
            points.some((point) => point.id === connectionId)
          ) && (
            <YMapFeature
              key={nanoid(6)}
              {...makePolyline(
                connection.map(
                  (id) => points.find((point) => point.id === id)!.coords!
                ),
                "#302f2d"
              )}
            />
          )
      )}
      <YMapListener
        onClick={(_, point) => {
          connectionFrom
            ? setConnectionFrom(undefined)
            : addPoint(point.coordinates);
        }}
      />
      {points.map((point) => (
        <YMapMarker
          key={point.id}
          coordinates={point.coords}
          markerElement={marker({
            id: point.id,
            weight: point.weight,
            onClick: (id: string) => handleCreateConnection(id),
            onRemove: (id: string) => {
              {
                removePoint(id);
                for (const connection of connections) {
                  if (connection.includes(id)) {
                    removeConnection(connection);
                  }
                }
              }
            },
            onWeightChange: (id, weight) =>
              updatePoint(id, { weight, coords: point.coords }),
          })}
          onDragEnd={(coords) =>
            updatePoint(point.id, { coords, weight: point.weight })
          }
          draggable
        />
      ))}
    </>
  );
}

export default Editor;
