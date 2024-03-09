import { Reducer } from "react";
import { preferance,initialState,PreferAvailableAction, PreferActions} from "./types";


export const PreferReducer: Reducer<preferance,PreferActions> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case PreferAvailableAction.FETCH_PREFER_REQUEST:
            return { ...state}
        case PreferAvailableAction.FETCH_PREFER_SUCCESS:
            return { ...state, ...action.payload }
        case PreferAvailableAction.FETCH_PREFER_FAILURE:
            return { ...state, iserror: action.payload }
        default:
            return state;
    }
}