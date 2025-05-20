export const getProjectHeader = async (path) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + path;

  const response = await fetch(url, {
    method: "get",
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
