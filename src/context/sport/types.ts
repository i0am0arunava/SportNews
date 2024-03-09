export interface Sports {
    id: number,
    name: string
}
export interface Sportan{
    sports: Sports[]
}
export interface SportsState {
    sports: Sports[],
    isLoading: boolean,
    isError: boolean,
    errorMessage: string
}

export const initialState: SportsState = {
    sports: [],
    isLoading: false,
    isError: false,
    errorMessage: "",
};

export enum SportsAvailableAction {
    FETCH_SPORTS_REQUEST = "FETCH_SPORTS_REQUEST",
    FETCH_SPORTS_SUCCESS = "FETCH_SPORTS_SUCCESS",
    FETCH_SPORTS_FAILURE = "FETCH_SPORTS_FAILURE"
}

export type SportActions =
    | { type: SportsAvailableAction.FETCH_SPORTS_REQUEST }
    | { type: SportsAvailableAction.FETCH_SPORTS_SUCCESS, payload: Sports[] }
    | { type: SportsAvailableAction.FETCH_SPORTS_FAILURE, payload: string }

export type SportDispatch = React.Dispatch<SportActions>