import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import API from "../api/axios";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const [isAuth, setIsAuth] = useState(null);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await API.get("/user/me");
        setUserRole(res.data?.data?.role || "");
        setIsAuth(true);
      } catch {
        setIsAuth(false);
      }
    };

    verify();
  }, []);

  if (isAuth === null) {
    return null;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
}
