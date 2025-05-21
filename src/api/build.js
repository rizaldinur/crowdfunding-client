import { getToken } from "../utils/utils";

export const getBuildOverviewData = async (path) => {
  const baseUrl = "http://localhost:8000";
  const url = baseUrl + path;

  let token = getToken();
  const response = await fetch(url, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data;
};

export const getFilledForm = async (path) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + path;
  let token = getToken();

  const response = await fetch(url, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data;
};

export const getPreviewData = async (path) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + path;
  let token = getToken();

  const response = await fetch(url, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data;
};

export async function putBuildForm(postData, pathname) {
  let baseurl = "http://localhost:8000";
  let url = baseurl + pathname;

  let token = getToken();
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(postData),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export const putReviewProject = async (path) => {
  const baseUrl = "http://localhost:8000";
  const url = baseUrl + path;

  const token = getToken();
  const response = await fetch(url, {
    method: "put",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data;
};

export const putLaunchProject = async (path, postData) => {
  const baseUrl = "http://localhost:8000";
  const url = baseUrl + path;

  const token = getToken();
  const response = await fetch(url, {
    method: "put",
    body: JSON.stringify(postData),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const deleteProject = async (path) => {
  const baseUrl = "http://localhost:8000";
  const url = baseUrl + path;

  const token = getToken();
  const response = await fetch(url, {
    method: "delete",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data;
};
