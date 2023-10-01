import { Box, Card, CardActions, CardContent, Grid, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee"
import { Link, useNavigate } from "react-router-dom";
import Chart from "../market/Chart";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownward from '@mui/icons-material/ArrowDownward';
import { color } from '../../color';
import Cookies from "universal-cookie";
import API from "../../API";

const classes = {
    card: {
        margin: '1vh 1vw 2vh 1vw',
        maxWidth: '14vw',
        height: '4vh',
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        padding: '0.5vw',
    }
}
function card(item, i) {
    let isDown = item.up < 0;
    let tcolor = item.up < 0 ? color.red : color.green;
    // console.log(item.symbol, item.change)
    return (
        <Card
            key={i}
            style={classes.card}
        >
            <div style={{display:'flex', flexDirection:'row', justifyContent: 'space-between', justifyItems:'space-between'}}>
                <div>
                    {isDown && <ArrowDownward style={{ color: `${color.red}`, alignContent: 'flex-start' }} />}
                    {!isDown && <ArrowUpwardIcon style={{ color: `${color.green}` }} />}
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', fontSize: '12px', justifyContent: 'space-between', justifyItems:'space-between' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span><b>{item.symbol}</b></span>
                        <span>{item.current_price.toFixed(2)}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', color: tcolor, marginLeft:'5px' }}>
                        <span>{item.price_change.toFixed(2)}</span>
                        <span>{item.percent_change.toFixed(2)}%</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}

const Marque = () => {
    const navigate = useNavigate();

    const [cards, setCards] = useState([]);
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(10);
    const [sent, setSent] = useState(false);
    
    useEffect(() => {
        const refresh_token = new Cookies().get('refresh_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        };
        const payload = {
            'offset': offset
        };
        if(sent) return;
        setSent(true);
        API.post('/data/stocks',payload, config).then(res => {
            // console.log(res.data);
            setData(res.data);
            // console.log(data[0]);
            let tCard = [];
            res.data.forEach((item, i) => {
                // console.log(item.symbol);
                tCard.push(card(item, i));
            })
            setCards(tCard);
        }).catch(err => {
            console.log(err);
        });
        setSent(false);
    }, []);



    return (
        <Marquee pauseOnHover={true}>
            {
                cards.map((item, i) => {
                    return (
                        <Link key={i} to={`/chart?symbol=${data[i].symbol}`} style={{ textDecoration: 'none' }}>
                            {item}
                        </Link>
                    )
                })
            }
        </Marquee>
    );
}

export default Marque;