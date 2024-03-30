import React, { useState, useEffect } from "react";

const LoginContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password, collegeName) => {},
});

export const LoginContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const isUserStored = localStorage.getItem("isLoggedIn");

    if (isUserStored === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };
  return (
    <LoginContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
export default LoginContext;
