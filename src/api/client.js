const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("dda_token");
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    if (response.status === 401 && !path.startsWith("/auth/login")) {
      localStorage.removeItem("dda_token");
      localStorage.removeItem("dda_user");
      if (window.location.pathname.startsWith("/admin") && !window.location.pathname.startsWith("/admin/login")) {
        window.location.assign("/admin/login");
      }
    }
    const message = body?.message || body?.error || "Request failed";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return body;
}

export const getData = async (path) => (await apiRequest(path)).data ?? [];
export const postData = async (path, data) => (await apiRequest(path, { method: "POST", body: JSON.stringify(data) })).data;
export const putData = async (path, data) => (await apiRequest(path, { method: "PUT", body: JSON.stringify(data) })).data;
export const deleteData = async (path) => apiRequest(path, { method: "DELETE" });

export async function uploadImage(file) {
  const token = localStorage.getItem("dda_token");
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch(`${API_BASE_URL}/uploads`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body?.message || "Image upload failed");
  return body.data.url;
}

export { API_BASE_URL };
