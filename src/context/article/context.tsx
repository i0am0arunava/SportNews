/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { articlestate,articlesDispatch } from "./types";
import{ initialstate ,articleReducer}from "./reducer"
console.log("i have doubt",1)
const articleStateContext = createContext<articlestate>(initialstate);
const articleDispatchContext = createContext<articlesDispatch>(() => {});
export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `taskReducer` and an initial state. Pass these as values to our contexts.

  const [state, dispatch] = useReducer(articleReducer, initialstate);
  return (
    <articleStateContext.Provider value={state}>
      <articleDispatchContext.Provider value={dispatch}>
        {children}
      </articleDispatchContext.Provider>
    </articleStateContext.Provider>
  );
};

// Create helper hooks to extract the `state` and `dispacth` out of the context.

export const usearticlesState = () => useContext(articleStateContext);
export const usearticleDispatch = () => useContext(articleDispatchContext);