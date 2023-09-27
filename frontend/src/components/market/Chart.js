import React from "react";
import Global from "../Global.css";

import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import API from "../../API";
import { Grid } from "@mui/material";
import { color } from "../../color";
import Candle from "./Candle";

const classes = {
    root:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        margin:'3vw',
    },
    top:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        width:'100%',
        height:'10vh',
        backgroundColor:'blue',
        opacity:'0.3',
        color:color.white,
    }
}




const Chart = () => {
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const symbol = params.get('symbol');
    const [data, setData] = useState(null)

    useEffect(() => {
        // const refresh_token = new Cookies().get('refresh_token');
        // const config = {
        //     headers: {
        //         'Authorization': `Bearer ${refresh_token}`
        //     }
        // }
        // if (refresh_token) {
        //     const payload = {
        //         "symbol": "AAPL",
        //         "interval": "1h",
        //         "period": "1d"
        //     }
            
        //     API.post('/data/candle', payload, config)
        //         .then(res => {
        //             setData(JSON.parse(res.data));
        //             if(data!=null && data.Open!=null) console.log(data['Open']);
        //         }).catch(err => {
        //             console.log(err);
        //         })
        // }
    }, []);

    return (
        <div style={classes.root}>
            <Grid container>
                <Grid item xs={12} sm={12}style={classes.top}>
                    {symbol}
                </Grid>
                <Grid item xs={12}>
                    MIDDLE
                </Grid>
                <Grid item xs={12} sm={12} style={{}}>
                    <Candle symbol={symbol}/>
                </Grid>
            </Grid>
        </div>
    );
}
export default Chart;