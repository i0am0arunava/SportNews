import { Reducer } from "react";
import { LiveMatchState, MatchActions, LiveMatchAvailableAction, initialState } from "./types";


export const MatchReducer: Reducer<LiveMatchState, MatchActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case LiveMatchAvailableAction.FETCH_MATCH_REQUEST:
            return { ...state, isLoading: true }
        case LiveMatchAvailableAction.FETCH_MATCH_SUCCESS:
            return { ...state, isLoading: false, matches: action.payload }
        case LiveMatchAvailableAction.FETCH_MATCH_FAILURE:
            return { ...state, isLoading: true, isError: true, errorMessage: action.payload }
        default:
            return state;
    }
}