import React, { useEffect } from 'react';
import API from '../../API';
import Cookies from 'universal-cookie';
import jwtDecode from 'jwt-decode';
import { color } from '../../color';
import Global from '../Global.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const [txt, setTxt] = React.useState(null);
    const [name, setName] = React.useState(null);
    const navigate = useNavigate();

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
                }).catch(err => {
                    console.log(err);
                    // new Cookies().remove('refresh_token');
                    // window.location.reload();
                });
            }
        }
        else {
            console.log("No refresh token");
            navigate('/')
            // new Cookies().remove('refresh_token');
            // window.location.reload();
        }

    }, []);

    return (
        <div className='center'>
            <h1>{name ? "Hello " + name : "Home"}</h1>
            <h3>{txt ? txt : ""}</h3>
        </div>
    );
}
export default Home;