import axios from "axios";

import { getHomeFault, getHomeStart, getHomeSuccess } from "./getHomeSlice";
import { subpageFault, subpageStart, subpageSuccess } from "./GetSubPageSlice";
import { chapterFault, chapterStart, chapterSuccess } from "./chapterSlice";
import { categoryFault, categoryStart, categorySuccess } from "./categorySlice";

export const apiGetHome = async (dispatch) => {
  dispatch(getHomeStart());
  try {
    let reps = await axios.get("/v1");
    dispatch(getHomeSuccess(reps.data));
  } catch (error) {
    dispatch(getHomeFault(error));
    console.log(error);
  }
};

export const apigetSubpage = async (dispatch, sub, page) => {
  dispatch(subpageStart());
  try {
    let reps = await axios.get("/v1/" + sub + "/?page=" + page || "?page=1");
    dispatch(subpageSuccess(reps.data));
  } catch (error) {
    dispatch(subpageFault(error));
  }
};

export const apichapter = async (dispatch, sub, page) => {
  dispatch(chapterStart());
  try {
    const resp = await axios.get("/v2/" + sub + "/" + page);
    dispatch(chapterSuccess(resp.data));
  } catch (error) {
    dispatch(chapterFault(error));
  }
};
// /v1/:category/:list/ api get category
export const apiCategory = async (dispatch, category, list, page) => {
  dispatch(categoryStart());
  try {
    let resp = await axios.get(
      /v1/ + category + "/" + list + "?page=" + page || "?page=1"
    );
    dispatch(categorySuccess(resp.data));
  } catch (error) {
    dispatch(categoryFault(error));
  }
};
