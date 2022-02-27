import constate from "constate";
import { useCallback, useState } from "react";

function useBulbState({ initialState = false }) {
  const [state, setState] = useState({ on: initialState, from: "", time : new Date() });
  const switchOn = useCallback(() => setState(prev => {
      return { ...prev, on : true }
  }), [])
  const switchOff = useCallback(() => setState(prev => {
      return { ...prev, on : false }
  }), [])
  const setSwitchData = useCallback((f,t) => setState(prev => {
      return { ...prev, from : f, time : t}
  }), [])
  return { state, switchOn, switchOff, setSwitchData };
}

export const [BulbStateProvider, useBulb, useSwitchOn, useSwitchOff, useSetSwitchData] = constate(
  useBulbState,
  value => value.state,
  value => value.switchOn, // becomes useSwitchOn
  value => value.switchOff, // becomes useSwitchOff
  value => value.setSwitchData
);
