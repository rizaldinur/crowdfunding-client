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

export const getFeaturedProject = async () => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + "/index/featured-project";

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getRecommendedProjects = async () => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + "/index/recommended-projects";

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getDiscoverProjects = async (filter) => {
  let baseurl = "http://localhost:8000";
  let url = baseurl + "/discover" + filter;

  const response = await fetch(url, {
    method: "get",
  });

  const data = await response.json();
  return data;
};
