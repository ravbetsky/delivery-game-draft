import React, { useEffect, useState } from "react";

const formatTimer = (timer: number) => `00:${timer < 10 ? `0${timer}` : timer}`;

function TimerUI() {
  const [timer, setTimer] = useState<number>(60);

  useEffect(() => {
    async function tickSecond() {
      return new Promise((res) => window.setTimeout(res, 1000));
    }
    if (timer !== 0) {
      tickSecond().then(() => setTimer(timer - 1));
    }
  }, [timer]);

  return (
    <div className="timer-ui">
      <div className="timer-ui__timer">{formatTimer(timer)}</div>
    </div>
  );
}

export default TimerUI;
