export const getProjectHeader = async (path) => {
  await new Promise((resolve, reject) => setTimeout(() => resolve(), 2000));
  let baseurl = "http://localhost:8000";
  let url = baseurl + path;

  const response = await fetch(url, {
    method: "get",
  });

  const data = await response.json();
  return data;
};
