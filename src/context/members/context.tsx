/* eslint-disable react-refresh/only-export-components */
// src/context/projects/context.tsx



import React, { createContext, useContext, useReducer } from "react";
type ProjectsDispatch = React.Dispatch<ProjectsActions>;



import { reducer, initialState, ProjectsState, ProjectsActions } from "./reducer";



const ProjectsStateContext = createContext<ProjectsState | undefined>(undefined);


const ProjectsDispatchContext = createContext<ProjectsDispatch | undefined>(undefined);
export const MembersProvider: React.FC<React.PropsWithChildren> = ({ children }) => 
{


  const [state, dispatch] = useReducer(reducer, initialState);



return (
    <ProjectsStateContext.Provider value={state}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsStateContext.Provider>
  );
};
export const useMembersState = () => useContext(ProjectsStateContext);
export const useMembersDispatch = () => useContext(ProjectsDispatchContext);
