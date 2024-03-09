import { SportDispatch, SportsAvailableAction } from "./types";
import { API_ENDPOINT } from "../../config/constants";

export const FetchSports = async (
    dispatch: SportDispatch,
) => {
    try {
        dispatch({ type: SportsAvailableAction.FETCH_SPORTS_REQUEST })
        const res = await fetch(`${API_ENDPOINT}/sports`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (!res.ok) {
            throw new Error("Failed to Fetch Sports")
        }
        const data = await res.json();
        dispatch({ type: SportsAvailableAction.FETCH_SPORTS_SUCCESS, payload: data.sports })
    } catch (error) {
        console.log(`Operation Failed:${error}`)
        dispatch({ type: SportsAvailableAction.FETCH_SPORTS_FAILURE, payload: "Unable to Load Matches" })
    }
}
