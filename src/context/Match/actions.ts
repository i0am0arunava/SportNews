/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MatchDispatch, LiveMatchAvailableAction } from "./types";
import { API_ENDPOINT } from "../../config/constants";
const token = localStorage.getItem("authToken") ?? "";
export const FetchMatches = async (
    dispatch: MatchDispatch,
) => {
    try {
        dispatch({ type: LiveMatchAvailableAction.FETCH_MATCH_REQUEST })
        const res = await fetch(`${API_ENDPOINT}/matches`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
        })
        if (!res.ok) {
            throw new Error("Failed to Fetch Matches")
        }
        const data = await res.json();
        dispatch({ type: LiveMatchAvailableAction.FETCH_MATCH_SUCCESS, payload: data.matches })
    } catch (error) {
        console.log(`Operation Failed:${error}`)
        dispatch({ type: LiveMatchAvailableAction.FETCH_MATCH_FAILURE, payload: "Unable to Load Matches" })
    }
}