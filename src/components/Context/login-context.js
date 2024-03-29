import React from "react";

const LoginContext = React.createContext({
    isLoggedIn: false,
    onLogout: false
})

export default LoginContext;
