import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles, rol }) {
  if (!rol) return null; // mientras carga
  if (!allowedRoles.includes(rol)) {
    return <Navigate to="/" replace />; // redirige a home
  }
  return children;
}