import https from "./https";

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  return await https.post("/api/authentication/register", {
    email: email,
    password: password,
    name: name
  });
};

export const loginUser = async (email: string, password: string) => {
  return await https.post("/api/authentication/login", {
    email: email,
    password: password,
  });
};

export const logoutUser = async () => {
  return await https.get("/api/authentication/logout");
};

export const loginWithGoogle = async (googleToken: string) => {
  return await https.post("/api/authentication/google?idtoken=" + googleToken);
};
