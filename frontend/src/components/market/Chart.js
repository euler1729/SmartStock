import React from "react";
import Global from "../Global.css";

import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import API from "../../API";
import { Button, Grid } from "@mui/material";
import { color } from "../../color";
import Candle from "./Candle";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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
        textDecoration: 'none'
    },
    vertical_line: {
        borderLeft: '6px solid white',
        height: '11.9vh',
        // position:'absolute',
        left: '50%'
    },
    text: {
        padding: '5px',
        position: 'relative',
        left: '75px',
        top: '5px',
        width: '100px',
        height: '15px',
        color: 'black',
        display: 'none',
        hover: {
            display: 'block'
        }
    },
    hover:{
        display: 'block'
    }
}




const Chart = () => {
    let search = window.location.search;
    const params = new URLSearchParams(search);
    const symbol = params.get('symbol');
    const [data, setData] = useState({})
    const [added, setAdded] = useState(false);

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
    function red() {
        return <div style={{ color: 'red' }}><ArrowDownwardIcon style={{ fontSize: '25px' }} /></div>
    }
    function green() {
        return <div style={{ color: 'green' }}><ArrowUpwardIcon style={{ fontSize: '25px' }} /></div>
    }
    const addToWatchList = ()=>{
        const refresh_token = new Cookies().get('refresh_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        }
        const payload = {
            "uid": jwtDecode(refresh_token).uid,
            "symbol": symbol,
        }
        API.post('/watchlist/add', payload, config)
        .then(res => {
            console.log(res.data);
            setAdded(true);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div style={classes.root}>
            <Grid container>
                <Grid container style={classes.top}>
                    <Grid item xs={12} sm={9} style={{ display: 'flex', flexDirection: 'column', fontSize: 14, textDecoration: 'none' }}>
                        <div>{symbol}</div>
                        <div style={{ fontSize: '12px' }}><a href={data?.website} style={{ color: 'white', textDecoration: 'none' }}>{data?.name}</a></div>
                    </Grid>

                    <Grid item xs={12} sm={3} style={{ display: 'flex', flexDirection: 'row', fontWeight: 'normal', fontSize: '12px', fontWeight: 'bold' }}>

                        <div>Current Price: ${data?.current_price}</div>
                        {
                            data?.price_change > 0 ? green() : red()
                        }
                        <div>Price Change: ${data?.price_change?.toFixed(2)}</div>
                        {
                            data?.price_change > 0 ? green() : red()
                        }
                        <div style={{}}>Percentage of Change: {Math.abs(data?.percent_change)?.toFixed(2)}%</div>
                        <Button style={{ color: 'white' }} onClick={addToWatchList}>
                            {!added && <AddCircleOutlineIcon />}
                            {added && <CheckCircleIcon />}
                        </Button>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Candle symbol={symbol} />
                </Grid>
            </Grid>
        </div>
    );
}
export default Chart;