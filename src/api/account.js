import { getToken } from "../utils/utils";

export const getProfileHeader = async (profileId) => {
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  let baseUrl = "http://localhost:8000";
  let endpoint = `${baseUrl}/${profileId}/profile-header`;
  let token = getToken();
  const response = await fetch(endpoint, {
    method: "get",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data;
};

export const getProfileAbout = async (path) => {
  let baseUrl = "http://localhost:8000";
  let url = `${baseUrl}${path}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Response("Not Found", {
      status: response.status,
      statusText: response.statusText,
    });
  }
  const data = await response.json();
  return data;
};

export const getProfileCreatedProjects = async (path) => {
  let baseUrl = "http://localhost:8000";
  let url = `${baseUrl}${path}`;
  let token = getToken();
  const response = await fetch(url, {
    headers: { Authorization: "Bearer " + token },
  });
  const data = await response.json();

  return data;
};
