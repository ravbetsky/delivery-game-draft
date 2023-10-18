import React, { useCallback, useState, useSyncExternalStore } from "react";
import copy from "copy-to-clipboard";
import { levelStore } from "../../entities/level/store";
import { Mode } from "../../types";

function AdminUI({
  mode,
  onModeChange,
}: {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}) {
  const level = useSyncExternalStore(
    levelStore.subscribe,
    levelStore.getSnapshot
  );
  const [levelJSON, setLevelJSON] = useState();

  const handleCopyToClipboard = useCallback(() => {
    copy(level ? JSON.stringify(level) : "");
  }, [level]);

  return (
    <div className="admin-ui">
      {mode === "solve" && (
        <button onClick={() => onModeChange("edit")}>
          Редактировать уровень
        </button>
      )}
      {mode === "edit" && (
        <button onClick={() => onModeChange("solve")}>Решить уровень</button>
      )}
      <button onClick={handleCopyToClipboard}>
        Скопировать уровень как JSON
      </button>
      <div>
        {/* @ts-ignore */}
        <textarea onChange={(e) => setLevelJSON(e.target.value)} />
        <br />
        {/* @ts-ignore */}
        <button onClick={() => levelStore.addLevel(JSON.parse(levelJSON))}>
          Загрузить JSON уровень
        </button>
      </div>
    </div>
  );
}

export default AdminUI;
