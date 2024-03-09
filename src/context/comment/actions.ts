/* eslint-disable @typescript-eslint/no-unused-vars */
import { API_ENDPOINT } from "../../config/constants";
import { commentlist, COMMENTListAvailableAction, commentssDispatch } from "./types";

// The function will take a dispatch as first argument, which can be used to send an action to `reducer` and update the state accordingly
export const addcom = async (
  data: commentlist,
  dispatch: commentssDispatch,
  projectID: string,
  taskID: string,
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: COMMENTListAvailableAction.CREATE_COMMENT_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create task");
    }
    dispatch({ type: COMMENTListAvailableAction.CREATE_COMMENT_SUCCESS });
    refreshTasks(dispatch, projectID, taskID);
  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: COMMENTListAvailableAction.CREATE_COMMENT_FAILURE
    });
  }
}; export const refreshTasks = async (
  dispatch: commentssDispatch,
  projectID: string,
  taskID: string
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: COMMENTListAvailableAction.FETCH_COMMENTS_REQUEST });
    const response = await fetch(
      `${API_ENDPOINT}/projects/${projectID}/tasks/${taskID}/comments`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    // extract the response body as JSON data
    const data = await response.json();
    console.log("ghdf", data)
    dispatch({
      type: COMMENTListAvailableAction.FETCH_COMMENTS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    console.error("Operation failed:", error);
    dispatch({
      type: COMMENTListAvailableAction.FETCH_COMMENTS_FAILURE,

    });
  }
};
