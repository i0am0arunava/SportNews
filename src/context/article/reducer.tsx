/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Reducer } from "react";

import { articlestate, ARTICLEListAvailableAction,ARTICLEActions } from "./types";

// Define the initial state
export const initialstate: articlestate= {
    isLoading: false,
    isError: false,
    article: [],
    createdAt:""
  }
export const articleReducer: Reducer<articlestate, ARTICLEActions> = (
  state = initialstate,
  action
) => {
  switch (action.type) {
    case ARTICLEListAvailableAction.FETCH_ARTICLES_REQUEST:
      return { ...state, isLoading: true };
    case ARTICLEListAvailableAction.FETCH_ARTICLES_SUCCESS:
      return { ...state, isLoading: false, article: action.payload };
    case ARTICLEListAvailableAction.FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
       
      };


    case ARTICLEListAvailableAction.CREATE_ARTICLE_REQUEST:
      return { ...state, isLoading: true };
    case ARTICLEListAvailableAction.CREATE_ARTICLE_SUCCESS:
      return { ...state, isLoading: false };
    case ARTICLEListAvailableAction.CREATE_ARTICLE_FAILURE:
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