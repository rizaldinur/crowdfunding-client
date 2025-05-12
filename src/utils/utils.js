import Cookies from "js-cookie";

export const getError = (body, errorData = []) => {
  const error = errorData.find((error) => {
    return error.body === body;
  });
  return error;
};

export const getToken = () => {
  let token = Cookies.get("jwt") || "";
  return token;
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
