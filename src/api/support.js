import { getToken } from "../utils/utils";

export const getSupportOverviewData = async (path) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + path;

  const token = getToken();
  const response = await fetch(url, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data;
};

export const postSupportProject = async (postData, path) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + path;

  const token = getToken();
  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(postData),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

export const deleteSupport = async (id) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + "/support/delete";

  const token = getToken();
  const response = await fetch(url, {
    method: "delete",
    body: JSON.stringify({ id }),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });
};

export const updateSupportStatus = async (id) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + "/support/update-status";

  const token = getToken();
  const response = await fetch(url, {
    method: "put",
    body: JSON.stringify({ id }),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};
