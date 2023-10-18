import React from "react";

function SolveUI({ score }: { score: number }) {
  return (
    <div className="solve-ui">
      <div className="solve-ui__score">{score}</div>
    </div>
  );
}

export default SolveUI;
