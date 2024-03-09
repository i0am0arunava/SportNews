/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { SportReducer } from "./reducer";
import { SportsState, SportDispatch, initialState } from "./types";

const SportsStateContext = createContext<SportsState>(initialState);
const SportsDispatchContext = createContext<SportDispatch>(() => {});

export const SportsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispacth] = useReducer(SportReducer, initialState);
  return (
    <SportsStateContext.Provider value={state}>
      <SportsDispatchContext.Provider value={dispacth}>
        {children}
      </SportsDispatchContext.Provider>
    </SportsStateContext.Provider>
  );
};

export const useSportsState = () => useContext(SportsStateContext);
export const useSportsDispatch = () => useContext(SportsDispatchContext);