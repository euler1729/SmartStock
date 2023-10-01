import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import API from '../../API';
import { color } from '../../color';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';

import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import Marquee from 'react-fast-marquee';

const classes = {
    root: {
        flexGrow: 1,
        marginLeft: '3vw',
        maxWith: '90vw',
        padding: '15',
        marginRigth: '3vw',
        alignItems: 'flex-start',
        maxHeight: '100vh',
    },
    paper_blue: {
        padding: 20,
        textAlign: "center",
        color: color.blue,
        boxShadow: `1px 1px 10px 0px ${color.blue}`,
    },
    paper_green: {
        padding: 20,
        textAlign: "center",
        color: color.blue,
        boxShadow: `1px 1px 10px 0px ${color.green}`
    },
    paper_red: {
        padding: 20,
        textAlign: "center",
        color: color.blue,
        boxShadow: `1px 1px 10px 0px ${color.red}`
    }
}

const News = () => {
    const colors = [color.blue, color.green, color.violet, color.lightViolet, color.pink, color.navy, color.gray];
    const n1 = {
        "link": "https://finance.yahoo.com/news/deep-value-stocks-etfs-top-183836841.html",
        "providerPublishTime": 1696012716,
        "publisher": "Insider Monkey",
        "relatedTickers": [
            "AAPL", "AMZN"
        ],
        "thumbnail": {
            "resolutions": [
                {
                    "height": 1284,
                    "tag": "original",
                    "url": "https://s.yimg.com/uu/api/res/1.2/VCVpX.BLO8.n5VpMPas9eA--~B/aD0xMjg0O3c9MTkyMDthcHBpZD15dGFjaHlvbg--/https://media.zenfs.com/en/insidermonkey.com/57c6f66163ffe6ef0ee880156ca4d360",
                    "width": 1920
                },
                {
                    "height": 140,
                    "tag": "140x140",
                    "url": "https://s.yimg.com/uu/api/res/1.2/3m.qwFFQqyk4xZhbWWSM2g--~B/Zmk9ZmlsbDtoPTE0MDtweW9mZj0wO3c9MTQwO2FwcGlkPXl0YWNoeW9u/https://media.zenfs.com/en/insidermonkey.com/57c6f66163ffe6ef0ee880156ca4d360",
                    "width": 140
                }
            ]
        },
        "title": "Deep Value Stocks ETFs: Top 10 Picks",
        "type": "STORY",
        "uuid": "cf133c77-720c-3ab3-8786-0eac2ae3abaf"
    };
    const [data, setData] = useState([n1, n1, n1, n1, n1]);

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
                API.get('/news/clusters', config).then(res => {
                    console.log(res);
                    if (res.status < 300) {
                        setData(res.data);
                        console.log(res.data)
                    } else {
                        new Cookies().remove('refresh_token');
                        window.location.reload();
                    }
                }).catch(err => {
                    new Cookies().remove('refresh_token');
                    window.location.reload();
                });
            }
        } else {
            new Cookies().remove('refresh_token');
            window.location.reload();
        }

    }, []);


    return (

        <div style={{}}>
            <h2 style={{}}>Business Insight</h2>
            <Marquee pauseOnHover>
                {
                    data.map((item, index) => {
                        return (
                            <Card key={index} sx={{ maxWidth: 250, height: 350, boxShadow: `1px 1px 10px 0px ${color.blue}`, marginBottom: '2vh', margin: '1vw' }}>
                                <CardActionArea>
                                    <div style={{ position: "relative" }}>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={item?.thumbnail?.resolutions[0].url}
                                            alt="green iguana"
                                        />
                                        <div style={{ opacity:0.5,position: "absolute", color: "white", top: 10, left: "85%", transform: "translateX(-50%)", background: `black`, fontWeight: 'bold', fontSize: '14px', borderRadius: '2px', padding: '3px' }}>
                                            {item.type}
                                        </div>
                                        {/* <div style={{ position: "absolute", color: "white", top: 10, left: "20%", transform: "translateX(-50%)", background: `black`, fontWeight: 'bold', fontSize: '10px', borderRadius: '2px', padding: '3px' }}>
                                            {new Date(item.providerPublishTime * 1000).toDateString()}
                                        </div> */}
                                    </div>
                                    <CardContent onClick={() => { window.open(item.link) }} >
                                        <Typography gutterBottom style={{ fontSize: 14, fontWeight:'bold'}} component="div">
                                            {item.title.length>60?item.title.slice(0,60)+'...':item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(item.providerPublishTime * 1000).toDateString()}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Publisher: {item.publisher}
                                        </Typography>
                                        <div style={{ display: 'flex', flexDirection: 'row'}}>
                                            {
                                                item.relatedTickers.map((item, index) => {
                                                    return (
                                                        <Typography key={index} variant="body2" style={{ margin: '2px', backgroundColor: `${colors[index % colors.length]}`, borderRadius: '2px', padding: '2px', color: 'white', fontSize: '10px' }}>
                                                            {item}
                                                        </Typography>
                                                    );
                                                })
                                            }
                                        </div>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        );
                    })
                }

            </Marquee>
        </div>
    );

}

export default News;