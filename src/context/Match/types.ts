
export interface LiveMatchData {
    id: number;
    isRunning: boolean;
    name: string;
    location: string;
    endsAt: string;
    teams: team[];
    sportName: string;
}
export interface matchdata{
    matches: LiveMatchData[]
}
export interface team{
id:number;
name:string
}
export interface LiveMatchState {
    matches: LiveMatchData[],
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}

export const initialState: LiveMatchState = {
    matches: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
};

export enum LiveMatchAvailableAction {
    FETCH_MATCH_REQUEST = "FETCH_MATCH_REQUEST",
    FETCH_MATCH_SUCCESS = "FETCH_MACTH_SUCCESS",
    FETCH_MATCH_FAILURE = "FETCH_MATCH_FAILURE"
}

export type MatchActions =
    | { type: LiveMatchAvailableAction.FETCH_MATCH_REQUEST }
    | { type: LiveMatchAvailableAction.FETCH_MATCH_SUCCESS, payload: LiveMatchData[] }
    | { type: LiveMatchAvailableAction.FETCH_MATCH_FAILURE, payload: string }

export type MatchDispatch = React.Dispatch<MatchActions>