import { useEffect, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import apiClient from "../../services/api-client";

type ContextType = { isAuthenticated: boolean | null };

export const VerifyAuth: React.FC = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkIfUserIsAuthenticated = async () => {
      if (localStorage.getItem("access_token")) {
          setAuthenticated(true);
          
      } else {
        setAuthenticated(false);
      }
    };

    checkIfUserIsAuthenticated();
  }, []);

  return <Outlet context={{ isAuthenticated }} />;
};

export function useAuthenticated() {
  return useOutletContext<ContextType>();
}
