import axios from "axios";
import {
  GET_ERRORS,
  GET_BACKLOG,
  GET_PROJECT_TASK,
  DELETE_PROJECT_TASK
} from "./types";

export const addProjectTask = (
  backlogId,
  project_task,
  history
) => async dispatch => {
  try {
    await axios.post(`/api/backlog/${backlogId}`, project_task);
    console.log(backlogId);
    history.push(`/projectBoard/${backlogId}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
export const getBacklog = backlogId => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${backlogId}`);
    dispatch({
      type: GET_BACKLOG,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
export const getProjectTask = (backlogId, ptid, history) => async dispatch => {
  try {
    const res = await axios.get(`/api/backlog/${backlogId}/${ptid}`);
    dispatch({
      type: GET_PROJECT_TASK,
      payload: res.data
    });
  } catch (err) {
    history.push("/dashboard");
  }
};

export const updateProjectTask = (
  backlogId,
  ptid,
  project_task,
  history
) => async dispatch => {
  try {
    await axios.patch(`/api/backlog/${backlogId}/${ptid}`, project_task);
    history.push(`/projectBoard/${backlogId}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
export const deleteProjectTask = (backlogId, ptid) => async dispatch => {
  if (
    window.confirm(
      `You are deleting project task ${ptid}, this action cannot be undone`
    )
  ) {
    await axios.delete(`/api/backlog/${backlogId}/${ptid}`);
    dispatch({
      type: DELETE_PROJECT_TASK,
      payload: ptid
    });
  }
};
