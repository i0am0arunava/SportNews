/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useContext, useReducer } from "react";
import { PreferReducer} from "./reducer";
import { preferance, PreferDispatch, initialState } from "./types";

const PreferStateContext = createContext<preferance>(initialState);
const PreferDispatchContext = createContext<PreferDispatch>(() => {});

export const PreferProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispacth] = useReducer(PreferReducer, initialState);
  return (
    <PreferStateContext.Provider value={state}>
      <PreferDispatchContext.Provider value={dispacth}>
        {children}
      </PreferDispatchContext.Provider>
    </PreferStateContext.Provider>
  );
};

export const usePreferState = () => useContext(PreferStateContext);
export const usePreferDispatch = () => useContext(PreferDispatchContext);