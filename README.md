# DDA Frontend v0.6.0

React + Vite frontend for Dembel Development Alliance.

## Run

```powershell
npm install
npm run dev
```

Optional `.env`:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

The frontend now consumes the DDA backend API, includes public dynamic pages, authentication, protected admin routes, and an admin content-management foundation.

Admin login: `/admin/login`

The browser stores the JWT in localStorage for the development workflow. Do not commit `.env` or credentials.
