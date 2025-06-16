const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const authenticateJWT = async (token) => {
  const response = await fetch(apiBaseUrl + "/authenticate", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const data = await response.json();
  return data;
};

export async function postSignup(postData) {
  const response = await fetch(apiBaseUrl + "/signup", {
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
  const response = await fetch(apiBaseUrl + "/login", {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}
