import { Level } from "./types";

let listeners: VoidFunction[] = [];
// let levels: Level[] = [];
let currentLevel: Level | undefined;

export const levelStore = {
  addLevel(level: Level) {
    currentLevel = level;
    emitChange();
  },
  subscribe(listener: VoidFunction) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return currentLevel;
  },
};

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}
