import { useCallback, useState } from "react";
import { Connection, Coords, Point } from "../../entities/level/types";
import { nanoid } from "nanoid";

type UsePointsData = {
  points: Point[];
  addPoint: (coords: Coords) => void;
  updatePoint: (id: string, newParams: Omit<Point, "id">) => void;
  removePoint: (id: string) => void;
};

export const usePoints = (): UsePointsData => {
  const [points, setPoints] = useState<Point[]>([]);
  const addPoint = useCallback(
    (coords: Coords) => {
      const newPoint: Point = {
        coords,
        id: nanoid(6),
        weight: 1,
      };
      setPoints([...points, newPoint]);
    },
    [points]
  );

  const removePoint = useCallback(
    (id: string) => {
      setPoints(points.filter((point) => point.id !== id));
    },
    [points]
  );

  const updatePoint = useCallback(
    (id: string, newParams: Omit<Point, "id">) => {
      const oldPoint = points.find((point) => point.id === id);
      const newPoints = points.filter((point) => point.id !== id);
      setPoints([...newPoints, { id, ...oldPoint, ...newParams }]);
    },
    [points]
  );
  return {
    points,
    addPoint,
    updatePoint,
    removePoint,
  };
};

type UseConnectionsData = {
  connections: Connection[];
  addConnection: (connection: Connection) => void;
  removeConnection: (connection: Connection) => void;
};

export const useConnections = (): UseConnectionsData => {
  const [connections, setConnections] = useState<Connection[]>([]);

  const addConnection = useCallback(
    (connection: Connection) => {
      setConnections([...connections, connection]);
    },
    [connections]
  );

  const removeConnection = useCallback(
    (connection: Connection) => {
      const id = connection.sort().join("");
      setConnections(
        connections.filter((connection) => connection.sort().join("") !== id)
      );
    },
    [connections]
  );

  return {
    connections,
    addConnection,
    removeConnection,
  };
};
