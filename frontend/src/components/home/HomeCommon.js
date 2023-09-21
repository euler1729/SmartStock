import React from 'react';
import {color} from '../../color';
import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import API from '../../API';
import Global from '../Global.css';


const Home = () => {
    const [txt, setTxt] = React.useState(null);

    useEffect(() => {
      API.get('/anonym/hello').then(res => {
        console.log(res)
        setTxt(res.data);
      }).catch(err => {
        console.log(err);
      });
    }, []);



  return (
    <div className='center'>
      <h1>Welcome to the Home Page</h1>
      <p>{txt}</p>
    </div>
  );
};

export default Home;
