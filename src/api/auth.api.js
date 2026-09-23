import { apiRequest } from "./client";

export async function login(email, password) {
  const result = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  if (result.data?.token) localStorage.setItem("dda_token", result.data.token);
  if (result.data?.user) localStorage.setItem("dda_user", JSON.stringify(result.data.user));
  return result.data;
}

export function logout() {
  localStorage.removeItem("dda_token");
  localStorage.removeItem("dda_user");
}

export function getStoredUser() {
  try { return JSON.parse(localStorage.getItem("dda_user") || "null"); }
  catch { return null; }
}

export async function me() {
  const result = await apiRequest("/auth/me");
  return result.data;
}
