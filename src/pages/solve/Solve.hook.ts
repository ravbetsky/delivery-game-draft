import { useCallback, useState } from "react";

export function useSolve() {
  const [score, setScore] = useState<number>(0);
  const [solveStack, setSolveCurve] = useState<string[]>([]);

  const pushPoint = useCallback(
    (pointId: string, weight: number) => {
      setScore(score + weight);
      setSolveCurve([...solveStack, pointId]);
    },
    [score, solveStack]
  );

  const popPoint = useCallback(
    (weight: number) => {
      setScore(score - weight);
      setSolveCurve(solveStack.slice(0, -1));
    },
    [score, solveStack]
  );

  return {
    solveStack,
    score,
    pushPoint,
    popPoint,
  };
}
