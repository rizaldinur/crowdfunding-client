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
