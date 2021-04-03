import React, { createContext, useContext, useEffect, useState } from "react";
import { login } from "@Services";

const LOCAL_STORAGE_USER_IDENTIFICATION = "@qualita-compliance-user";

const SessionContext = createContext(null);

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      const sessionUserData = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_USER_IDENTIFICATION)
      );
      sessionUserData && setUser(sessionUserData);
    }
  }, [user]);

  async function signIn({ identifier, password }) {
    try {
      const { data: loginResponse } = await login({ identifier, password });
      setUser(loginResponse);
      localStorage.setItem(
        LOCAL_STORAGE_USER_IDENTIFICATION,
        JSON.stringify({ ...loginResponse, identifier })
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: "Credenciais Inválidas",
      };
    }
  }

  function logout() {
    setUser({});
    localStorage.clear();
  }

  return (
    <SessionContext.Provider value={{ user, signIn, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

const useSession = () => useContext(SessionContext);

export { SessionProvider, useSession };
