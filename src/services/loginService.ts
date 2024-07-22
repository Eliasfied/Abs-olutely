import https from "./https";

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  return await https.post("/authentication/register", {
    email: email,
    password: password,
    name: name
  });
};

export const loginUser = async (email: string, password: string) => {
  return await https.post("/authentication/login", {
    email: email,
    password: password,
  });
};

export const logoutUser = async () => {
  return await https.get("/authentication/logout");
};

export const loginWithGoogle = async (googleToken: string) => {
  return await https.post("/authentication/google?idtoken=" + googleToken);
};
