import React, { useEffect } from 'react'
import API from '../../API';


import { color } from '../../color';
import jwtDecode from 'jwt-decode';
import { Cookie } from '@mui/icons-material';
import Cookies from 'universal-cookie';
import { Grid } from '@mui/material';
import axios from 'axios';


const News = () => {
    const [data, setData] = React.useState(null);
    useEffect(() => {
        const refresh_token = new Cookies().get('refresh_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        }
        // console.log(config);
        if (refresh_token) {
            const decode = jwtDecode(refresh_token);
            // console.log(decode);
            const req = {
                uid: decode.uid,
                email: decode.sub.toLowerCase()
            }
            if (decode.exp < (new Date()).getMilliseconds()) {
                new Cookies().remove('refresh_token');
                window.location.reload();
            } else {
                API.post('/news/clusters', req, config).then(res => {
                    console.log(res);
                    if (res.status < 300) {
                        setData(res.data);
                    } else {
                        setData(<span style={{ color: color.red }}>Error</span>);
                    }
                }).catch(err => {
                    console.log(err);
                    setData(<span style={{ color: 'red' }}>err</span>)
                });
            }
        } else {
            new Cookies().remove('refresh_token');
            window.location.reload();
        }

    }, []);

    return (

        <div>
            <Grid container>
                <h1>{data}</h1>
            </Grid>
        </div>

    );

}

export default News;