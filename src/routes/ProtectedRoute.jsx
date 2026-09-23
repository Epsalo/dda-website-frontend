import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ roles }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <main className="page-state"><div className="container"><p>Loading...</p></div></main>;
  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/admin" replace />;
  return <Outlet />;
}
