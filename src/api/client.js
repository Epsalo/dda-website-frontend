const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

/**
 * Returns the backend root origin without trailing slash or /api/v1.
 */
export function getBackendOrigin() {
  const base = (import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1").trim().replace(/\/+$/, "");
  return base.replace(/\/api\/v1\/?$/, "");
}

/**
 * Resolves an image URL to ensure it loads correctly regardless of whether
 * it was stored as a local URL (e.g. http://localhost:5000/uploads/...),
 * a relative path (/uploads/...), or a full remote URL.
 */
export function getImageUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // If it's already a relative path to Frontend public assets (e.g. /images/..., /payments/...)
  if (trimmed.startsWith("/images/") || trimmed.startsWith("/payments/") || trimmed.startsWith("./")) {
    return trimmed;
  }

  const backendOrigin = getBackendOrigin();

  // If the URL contains localhost or 127.0.0.1 (from local development database records)
  const localhostPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/.*)?$/i;
  const match = trimmed.match(localhostPattern);
  if (match) {
    const pathname = match[3] || "";
    return `${backendOrigin}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
  }

  // If it is a relative path starting with /uploads/ or uploads/
  if (trimmed.startsWith("/uploads/") || trimmed.startsWith("uploads/")) {
    const cleanPath = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return `${backendOrigin}${cleanPath}`;
  }

  // If page is HTTPS and URL is HTTP (not localhost), upgrade to HTTPS to avoid Mixed Content
  if (typeof window !== "undefined" && window.location.protocol === "https:" && trimmed.startsWith("http://")) {
    return trimmed.replace(/^http:\/\//i, "https://");
  }

  return trimmed;
}

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
  return body?.data?.relativePath || body?.data?.url || "";
}

export { API_BASE_URL };

