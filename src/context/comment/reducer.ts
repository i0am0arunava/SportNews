/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reducer } from "react";

import { Commentstate, COMMENTListAvailableAction,COMMENTActions } from "./types";

// Define the initial state
export const initialstate: Commentstate= {
    isLoading: false,
    isError: false,
    comment: [],
    createdAt:""
  }
export const commentReducer: Reducer<Commentstate, COMMENTActions> = (
  state = initialstate,
  action
) => {
  switch (action.type) {
    case COMMENTListAvailableAction.FETCH_COMMENTS_REQUEST:
      return { ...state, isLoading: true };
    case COMMENTListAvailableAction.FETCH_COMMENTS_SUCCESS:
      return { ...state, isLoading: false, comment: action.payload };
    case COMMENTListAvailableAction.FETCH_COMMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
       
      };


    case COMMENTListAvailableAction.CREATE_COMMENT_REQUEST:
      return { ...state, isLoading: true };
    case COMMENTListAvailableAction.CREATE_COMMENT_SUCCESS:
      return { ...state, isLoading: false };
    case COMMENTListAvailableAction.CREATE_COMMENT_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
    
      }; 
    // Toggle the loading state based on action
    default:
      return state;
    
  }
};