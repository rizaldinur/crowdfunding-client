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
