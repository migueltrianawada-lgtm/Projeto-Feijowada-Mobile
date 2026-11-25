import React, {
  createContext,
  useState
} from "react";

export const AuthContext =
  createContext({});

export function AuthProvider({
  children
}) {

  const [user, setUser] =
    useState(null);

  const [token, setToken] =
    useState(null);

  function signIn(
    userData,
    authToken
  ) {

    setUser(userData);

    setToken(authToken);

  }

  function logout() {

    setUser(null);

    setToken(null);

  }

  return (

    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}