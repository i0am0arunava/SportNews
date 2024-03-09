/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PreferDispatch,PreferAvailableAction } from "./types";
import { API_ENDPOINT } from "../../config/constants";
import { preferance } from "./types";

export const updaPreferes = async (
    dispatch:PreferDispatch,
    preferences:preferance
) => {
   
    try {
        const token = localStorage.getItem("authToken") ?? "";
        console.log("i am here")
        dispatch({ type: PreferAvailableAction.FETCH_PREFER_REQUEST })
        const res = await fetch(`${API_ENDPOINT}/user/preferences`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ preferences }),
          });
          FetchPreferes(dispatch);
        if (!res.ok) {
            throw new Error("Failed to Fetch Matches")
        }
   
    } catch (error) {
        console.log(`Operation Failed:${error}`)
        dispatch({ type: PreferAvailableAction.FETCH_PREFER_FAILURE, payload: "Unable to Load Matches" })
    }
}





export const FetchPreferes = async (
    dispatch:PreferDispatch,
) => {
    try {
        const token = localStorage.getItem("authToken") ?? "";
        dispatch({ type: PreferAvailableAction.FETCH_PREFER_REQUEST })
        const res = await fetch(
            `${API_ENDPOINT}//user/preferences`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await res.json();
          console.log("check",data)
          dispatch({ type: PreferAvailableAction.FETCH_PREFER_SUCCESS, payload: data.preferences })
        if (!res.ok) {
            throw new Error("Failed to Fetch Matches")
        }
     
       console.log("finally",data)
    } catch (error) {
        console.log(`this Operation Failed so what have to:${error}`)
        dispatch({ type: PreferAvailableAction.FETCH_PREFER_FAILURE, payload: "Unable to Load Matches" })
    }
}