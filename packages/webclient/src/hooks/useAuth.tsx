import { useState, useEffect } from "react";
import Cookies from "js-cookie";

function useAuth(): boolean {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = Cookies.get("token");
    if (authToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return isAuthenticated;
}

export default useAuth;
