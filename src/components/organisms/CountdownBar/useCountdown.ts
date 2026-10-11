"use client";

import { useEffect, useState } from "react";

export interface CountdownValue {
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function diff(targetMs: number): CountdownValue {
  const remainingMs = Math.max(0, targetMs - Date.now());
  const totalSeconds = Math.floor(remainingMs / 1000);
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isExpired: remainingMs <= 0,
  };
}

/** Ticks every second toward `targetDate`, stopping (and clamping at 0) once it's reached. */
export function useCountdown(targetDate: Date): CountdownValue {
  const targetMs = targetDate.getTime();
  const [state, setState] = useState(() => ({ targetMs, value: diff(targetMs) }));

  // Re-derive synchronously during render if the caller passes a new
  // target (React's sanctioned "adjust state when a prop changes"
  // pattern) — keeps the interval below free of a redundant setState
  // call on every effect run.
  if (state.targetMs !== targetMs) {
    setState({ targetMs, value: diff(targetMs) });
  }

  useEffect(() => {
    const id = setInterval(() => {
      setState((previous) => {
        if (previous.value.isExpired) return previous;
        return { targetMs: previous.targetMs, value: diff(previous.targetMs) };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  return state.value;
}
