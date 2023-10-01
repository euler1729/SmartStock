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
    root: {
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        margin: '3vw',

    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        background: `linear-gradient(to right, ${color.violet}, ${color.pink})`,
        color: color.white,
        fontWeight: 'bold',
        fontSize: '2vw',
        padding: '8px 8px 5px 3vw',
        margin: '0vw 0vw 1vw 0vw',
        borderRadius: '1vw',
        boxShadow: `1px 1px 10px 0px ${color.pink}`,
        textDecoration:'none'
    },
    vertical_line: {
        borderLeft: '6px solid white',
        height: '11.9vh',
        // position:'absolute',
        left: '50%'
    }
}




const Chart = () => {
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const symbol = params.get('symbol');
    const [data, setData] = useState({})

    useEffect(() => {
        const refresh_token = new Cookies().get('refresh_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        }
        if (refresh_token) {
            const payload = {
                "symbol": symbol,
            }

            API.post('/data/current-price', payload, config)
                .then(res => {
                    setData(res.data);
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                })
        }
    }, []);

    return (
        <div style={classes.root}>
            <Grid container>
                <Grid container style={classes.top}>
                    <Grid item xs={12} sm={4} style={{display: 'flex', flexDirection:'column', fontSize:14, textDecoration:'none'}}>
                        <div>{symbol}</div>
                        <div style={{fontSize:'12px', textDecoration:'none', color:'${color.white'}}><a href={data?.website}>{data?.name}</a></div>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{display: 'flex', flexDirection:'column', fontWeight:'normal', fontSize:'12px'}}>
                        <div>Current Price: ${data?.current_price}</div>
                        <div>Price Change: ${data?.price_change}</div>
                        <div>Percentage of Change: {data?.percent_change}%</div>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} style={{}}>
                    <Candle symbol={symbol} />
                </Grid>
            </Grid>
        </div>
    );
}
export default Chart;