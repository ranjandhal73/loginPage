import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import LoginContext from './components/Context/login-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  useEffect(()=>{
    const isUserStored = localStorage.getItem('isLoggedIn');
   
    if(isUserStored === 'true'){
      setIsLoggedIn(true)
    }
  },[])
  

  const loginHandler = (email, password, collegeName) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    console.log(email, password, collegeName)
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
    <LoginContext.Provider 
    value={{
      isLoggedIn: isLoggedIn,
      onLogout: logoutHandler,
      onLogin: loginHandler
    }}
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home onLogout={logoutHandler}/>}
      </main>
    </LoginContext.Provider>
  );
}

export default App;
