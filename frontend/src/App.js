import React from 'react';
import { useEffect } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/header/Navbar';
import HomeCommon from './components/home/HomeCommon';
import Market from './components/market/Market';


function App() {
  // const [refresh_token, setRefreshToken] = React.useState(null);
  // const [access_token, setAccessToken] = React.useState(null);

  useEffect(() => {
    
  },[]);


  return (
    <div className='App'>
      <Navbar />
      <Router>
        <Routes>
          (refresh_token==null) && <Route path='/' element={<HomeCommon />} />{/*Home-Not Authorized*/}
          (refresh_token!=null) && <Route path='/' element={<HomeCommon />} />{/*Home-Authorized*/}
          <Route path='/market' element={<Market />} />{/*Market*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
