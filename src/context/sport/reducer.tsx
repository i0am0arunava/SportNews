import { Reducer } from "react";
import {
  SportsState,
  SportActions,
  SportsAvailableAction,
  initialState,
} from "./types";

export const SportReducer: Reducer<SportsState, SportActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SportsAvailableAction.FETCH_SPORTS_REQUEST:
      return { ...state, isLoading: true };
    case SportsAvailableAction.FETCH_SPORTS_SUCCESS:
      return { ...state, isLoading: false, sports: action.payload };
    case SportsAvailableAction.FETCH_SPORTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};