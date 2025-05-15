import { getToken } from "../utils/utils";

export async function postSignup(postData) {
  const response = await fetch("http://localhost:8000/signup", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function postLogin(postData) {
  const response = await fetch("http://localhost:8000/login", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

export async function postBuildBasicForm(postData, pathname) {
  let baseurl = "http://localhost:8000";
  let url = baseurl + pathname;

  let token = getToken();
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
}

export const authenticateJWT = async (token) => {
  const response = await fetch("http://localhost:8000/authenticate", {
    method: "POST",
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
