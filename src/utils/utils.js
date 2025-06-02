import Cookies from "js-cookie";

export const getError = (path, errorData = [], pathKey = "body") => {
  const error = errorData.find((error) => {
    return error[pathKey] === path;
  });
  return error;
};

export const getToken = () => {
  let token = Cookies.get("jwt") || "";
  return token;
};

export const setToken = (token) => {
  Cookies.set("jwt", token, {
    expires: 15 / 1440,
  });
};

export const assignMenuPath = (path, param) => {
  let completePath;
  switch (path) {
    case "profile":
      completePath = `${path}/${param}`;
      break;
    case "settings":
      completePath = `${path}/${param}`;
      break;
    case "saved":
      completePath = `profile/${param}/${path}`;
      break;
    case "projects":
      completePath = `profile/${param}/${path}`;
      break;
    default:
      completePath = "..";
  }
  return completePath;
};
