import React, { useEffect } from 'react';
import API from '../../API';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { color } from '../../color';
import Global from '../Global.css';
import { useNavigate } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Home = () => {
    const [txt, setTxt] = React.useState(null);
    const [name, setName] = React.useState(null);
    const navigate = useNavigate();
    const [isAuthenticated, setAuthenticated] = React.useState(false);
    
    useEffect(() => {
        const refresh_token = new Cookies().get('refresh_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        }
        if (refresh_token) {
            const decode = jwtDecode(refresh_token);

            if (decode.exp < (new Date()).getMilliseconds()) {
                new Cookies().remove('refresh_token');
                navigate('/');
                window.location.reload();
            }
            else {

                API.post('/home/hello', {}, config).then(res => {
                    console.log(res)
                    setTxt(res.data);
                    setName(decode.name)
                    setAuthenticated(true);
                }).catch(err => {
                    console.log(err);
                });
            }
        }
        else {
            console.log("No refresh token");
            navigate('/')
        }

    }, []);

    return (<>
        {isAuthenticated ?
        <div className='center'>
            <h1 style={{ color: color.primary }}>Hello {name}</h1>
        </div>
        : <></>}
    </>);

}
export default Home;