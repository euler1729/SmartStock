import React, { useEffect } from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';

import API from '../../API';
import { color } from '../../color';
import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';

import { Grid } from '@mui/material';

const classes = {
    root: {
        flexGrow: 1,
        marginLeft: '3vw',
        // maxWith: '100vw',
        padding: '20',
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
    const [data, setData] = React.useState(null);
    useEffect(() => {
        // const refresh_token = new Cookies().get('refresh_token');
        // const config = {
        //     headers: {
        //         'Authorization': `Bearer ${refresh_token}`
        //     }
        // }
        // // console.log(config);
        // if (refresh_token) {
        //     const decode = jwtDecode(refresh_token);
        //     // console.log(decode);
        //     const req = {
        //         uid: decode.uid,
        //         email: decode.sub.toLowerCase()
        //     }
        //     if (decode.exp < (new Date()).getMilliseconds()) {
        //         new Cookies().remove('refresh_token');
        //         window.location.reload();
        //     } else {
        //         API.post('/news/clusters', req, config).then(res => {
        //             console.log(res);
        //             if (res.status < 300) {
        //                 setData(res.data);
        //             } else {
        //                 setData(<span style={{ color: color.red }}>Error</span>);
        //             }
        //         }).catch(err => {
        //             console.log(err);
        //             setData(<span style={{ color: 'red' }}>err</span>)
        //         });
        //     }
        // } else {
        //     new Cookies().remove('refresh_token');
        //     window.location.reload();
        // }

    }, []);
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

    return (

        <div style={{}}>
            <h2 style={{}}>Business Insight</h2>
            <Grid container style={{}}>

                <Card orientation="horizontal" variant="outlined" sx={{ width: 260 }}>
                    <CardOverflow>
                        <AspectRatio ratio="1" sx={{ width: 90 }}>
                            <img
                                src={n1.thumbnail.resolutions[1].url}
                                srcSet={n1.thumbnail.resolutions[1].url}
                                loading="lazy"
                                alt=""
                            />
                            <Typography>
                                <span style={{ color: color.white, backgroundColor: color.blue, padding: '5px' }}>{n1.publisher}</span>
                            </Typography>
                        </AspectRatio>
                    </CardOverflow>
                    <CardContent>
                        <Typography fontWeight="md" textColor="success.plainColor">
                            {n1.title}
                        </Typography>
                        <Typography level="body-sm">{new Date(n1.providerPublishTime*1000).toDateString()}</Typography>
                    </CardContent>
                    <CardOverflow
                        variant="soft"
                        color="primary"
                        sx={{
                            px: 0.2,
                            writingMode: 'vertical-rl',
                            textAlign: 'center',
                            fontSize: 'xs',
                            fontWeight: 'xl',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            borderLeft: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        |{n1.relatedTickers.map((item, index) => {
                            return <span key={index}>{item+'|'}</span>
                        })}
                    </CardOverflow>
                </Card>
            </Grid>
        </div>
    );

}

export default News;