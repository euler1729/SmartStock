import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom';


import Navbar from './components/header/Navbar';
import HomeCommon from './components/home/HomeCommon';
import Home from './components/home/Home';
import Market from './components/market/Market';
import Watchlist from './components/watchlist/Watchlist';
import Auth from './components/auth/Auth';
import Portfolio from './components/portfolio/Portfolio';
import Account from './components/account/Account';
import EditProfile from './components/account/EditProfile';
import Cookies from 'universal-cookie';


function App() {

  useEffect(() => {

  }, []);



  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Routes>

          <Route path='/' element={<HomeX />} />

          <Route path='/market' element={<Protected />} >
            <Route path='/market' element={<Market />} />
          </Route>

          <Route path='/watchlist' element={<Protected />} >
            <Route path='/watchlist' element={<Watchlist />} />
          </Route>

          <Route path='/portfolio' element={<Protected />} >
            <Route path='/portfolio' element={<Portfolio />} />
          </Route>
          <Route path='/account' element={<Protected />} >
            <Route path='/account' element={<Account />} />
          </Route>
          <Route path='/edit-profile' element={<Protected />} >
            <Route path='/edit-profile' element={<EditProfile/>} />
          </Route>
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

const HomeX = () => {
  const refresh_token = new Cookies().get('refresh_token');
  console.log(refresh_token);
  return refresh_token ? <Home /> : <HomeCommon />;
}
const Protected = () => {
  const refresh_token = new Cookies().get('refresh_token');
  console.log(refresh_token)
  return refresh_token ? <Outlet /> : <Navigate to="/auth" />;
}



export default App;
