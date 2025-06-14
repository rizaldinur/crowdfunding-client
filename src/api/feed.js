import { getToken } from "../utils/utils";

export const getProjectHeader = async (path) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + path;
  const token = getToken();
  const response = await fetch(url, {
    method: "get",
    headers: {
      Authorization: "Basic " + token,
    },
  });

  const data = await response.json();
  return data;
};

export const getProjectDetails = async (path) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + path;

  const response = await fetch(url, {
    method: "get",
  });

  const data = await response.json();
  return data;
};

export const getFeaturedProject = async () => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + "/index/featured-project";

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getRecommendedProjects = async () => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + "/index/recommended-projects";

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getDiscoverProjects = async (filter) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + "/discover" + filter;

  const response = await fetch(url, {
    method: "get",
  });

  const data = await response.json();
  return data;
};

export const getComments = async (projectId = "", filter = "") => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + `/comment/${projectId}` + filter;

  const response = await fetch(url, {
    method: "get",
  });

  const data = await response.json();
  return data;
};

export const getReplies = async (commentId = "", filter = "") => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + `/reply/${commentId}` + filter;

  const response = await fetch(url, {
    method: "get",
  });

  const data = await response.json();
  return data;
};

export const postUpdateProject = async (
  postData,
  profileId = "",
  projectId = ""
) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + `/project/details/${profileId}/${projectId}/update`;
  const token = getToken();
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(postData),
    headers: {
      Authorization: "Basic " + token,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const postComment = async (postData, projectId = "") => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + `/comment/${projectId}`;
  const token = getToken();
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(postData),
    headers: {
      Authorization: "Basic " + token,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const postReply = async (postData, commentId = "") => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + `/reply/${commentId}`;
  const token = getToken();
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(postData),
    headers: {
      Authorization: "Basic " + token,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
