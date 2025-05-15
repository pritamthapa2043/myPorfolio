import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Auth status:", !!token);
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
};
