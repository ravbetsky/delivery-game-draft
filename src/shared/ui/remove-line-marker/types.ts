import { Connection } from "../../../entities/level/types";

export type RemoveLineMarkerProps = {
  connection: Connection;
  onClick?: (connection: Connection) => void;
};
