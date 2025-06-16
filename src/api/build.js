import { getToken } from "../utils/utils";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const getBuildOverviewData = async (path) => {
  const baseUrl = apiBaseUrl;
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
  let baseurl = apiBaseUrl;
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
  let baseurl = apiBaseUrl;
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

export const postStartProject = async (formData) => {
  const token = getToken();
  const requestOptions = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer " + token,
    },
    redirect: "follow",
  };

  const response = await fetch(apiBaseUrl + "/start-project", requestOptions);

  const data = await response.json();
  return data;
};

export async function putBuildForm(postData, pathname) {
  let baseurl = apiBaseUrl;
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
  const baseUrl = apiBaseUrl;
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
  const baseUrl = apiBaseUrl;
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
  const baseUrl = apiBaseUrl;
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
