/* eslint-disable @typescript-eslint/no-unused-vars */


import {  ARTICLEListAvailableAction, articlesDispatch ,articlelist} from "./types";
export const fetcharticles = async (
  dispatch: articlesDispatch,
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: ARTICLEListAvailableAction.FETCH_ARTICLES_REQUEST });
    const response = await fetch('https://wd301-capstone-api.pupilfirst.school/articles', {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json', "Authorization": `Bearer ${token}`
      },
    });
    const data = await response.json();
    

    dispatch({
      type: ARTICLEListAvailableAction.FETCH_ARTICLES_SUCCESS,
      payload: data,
    });


  } catch (er) {
    console.log(er)
  }

}
export const refresharticles = async (
  dispatch: articlesDispatch,
  data:articlelist[]
) => {
  
  try {
    dispatch({
      type: ARTICLEListAvailableAction.FETCH_ARTICLES_SUCCESS,
      payload: data,
    });

  } catch (error) {
    console.error("Operation failed:", error);
 
  }
};
