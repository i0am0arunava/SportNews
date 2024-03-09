/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { Commentstate,commentssDispatch } from "./types";
import{ initialstate ,commentReducer}from "./reducer"
console.log("i have doubt",1)
const commentStateContext = createContext<Commentstate>(initialstate);
const commentDispatchContext = createContext<commentssDispatch>(() => {});
export const CommentsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `taskReducer` and an initial state. Pass these as values to our contexts.
  console.log("i have doubt",children)
  const [state, dispatch] = useReducer(commentReducer, initialstate);
  return (
    <commentStateContext.Provider value={state}>
      <commentDispatchContext.Provider value={dispatch}>
        {children}
      </commentDispatchContext.Provider>
    </commentStateContext.Provider>
  );
};

// Create helper hooks to extract the `state` and `dispacth` out of the context.
console.log("i have doubt",)
export const usecommentsState = () => useContext(commentStateContext);
export const usecommentDispatch = () => useContext(commentDispatchContext);