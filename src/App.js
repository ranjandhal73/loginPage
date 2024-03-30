import React, { useContext }from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import LoginContext from './components/Context/login-context';

function App() {
 const ctx =  useContext(LoginContext);
  return (
    <>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home/>}
      </main>
    </> 
  );
}

export default App;
