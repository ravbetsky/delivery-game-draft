import React, { useState } from "react";
import Map from "./shared/ui/map/Map";
import { MapProvider } from "./shared/ui/map/MapProvider";
import Editor from "./pages/editor/Editor";
import AdminUI from "./components/admin-ui/AdminUI";
import { Mode } from "./types";
import Solve from "./pages/solve/Solve";

function App() {
  const [mode, setMode] = useState<Mode>("edit");
  return (
    <MapProvider>
      <AdminUI mode={mode} onModeChange={setMode} />
      {mode === "edit" && (
        <Map mode={mode}>
          <Editor />
        </Map>
      )}
      {mode === "solve" && <Solve />}
    </MapProvider>
  );
}

export default App;
