import React, { useEffect } from 'react';
import Global from '../Global.css';
import API from '../../API';



import { color } from '../../color';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DataTable from '../Data/DataTable';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, tableCellClasses, Button } from '@mui/material';
import News from './News';
import Marque from './Marque';
import { ArrowForwardIos } from '@mui/icons-material';
import Cookies from "universal-cookie";
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const classes = {
    root: {
        flexGrow: 1,
        margin: '2vw',
        // maxWith: '100vw',
        // padding: '20',
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
        color: color.green,
        boxShadow: `1px 1px 10px 0px ${color.green}`
    },
    paper_red: {
        padding: 20,
        textAlign: "center",
        color: color.red,
        boxShadow: `1px 1px 10px 0px ${color.red}`
    },
    middle: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: `${color.white}`,
        marginTop: '2vw',
        // marginRight: '2vw',
    },
    middle_right: {
        display: 'flex',
        flexDirection: 'column',
        // placeItems: 'center',
        backgroundColor: `${color.gray}`,
        // marginTop: '5vw',
        justifyContent: 'space-betqween',
        // padding: '20',
    },
    middle_left: {
        display: 'flex',
        flexDirection: 'column',
        placeItems: 'center',
        backgroundColor: `${color.white}`,
        // marginRight: '5vw',
        // padding: '20',
    },
    paper_news: {
        padding: 20,
        boxShadow: `1px 1px 10px 0px ${color.blue}`,
        // borderRadius: '20px',
        maxWidth: '90vw',
        maxHeight: '100vh',
        marginTop: '2vw',
        justifyContent: 'space-between',
    },
    paper_right: {
        padding: 20,
        textAlign: "center",
        color: color.blue,
        boxShadow: `1px 1px 10px 0px ${color.blue}`,
        marginBottom: '2vw',
    }
};
function randomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}
const Home = () => {
    const [txt, setTxt] = React.useState(null);
    const [spacing, setSpacing] = React.useState(1);
    const rows = [
        ['JANATAMF', 0, 0, 0, 6.1, 6.1, 0, 0, 0, 0],
        ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8, 14.6, 0.2, 87, 0.604, 40899],
        ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8, 14.6, 0.2, 87, 0.604, 40899],
        ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8, 14.6, 0.2, 87, 0.604, 40899],
        ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8, 14.6, 0.2, 87, 0.604, 40899],
        ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8, 14.6, 0.2, 87, 0.604, 40899],
        ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8, 14.6, 0.2, 87, 0.604, 40899],
        ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8, 14.6, 0.2, 87, 0.604, 40899],
        ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8, 14.6, 0.2, 87, 0.604, 40899],
        ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8, 14.6, 0.2, 87, 0.604, 40899],
        ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8, 14.6, 0.2, 87, 0.604, 40899],
        ['AAMRANET', 57.8, 59.7, 55.6, 57.8, 55.8, 2, 2034, 76.736, 1322921]
    ];
    const header = ['symbol', 'ltp', 'high', 'low', 'open', 'close', 'ycp', 'trade', 'value', 'volume'];

    const data = [header, rows];

    const trending = [
        {
            "current_price": 95.62,
            "percent_change": 6.68,
            "price_change": 5.99,
            "symbol": "NKE",
            "up": 1,
            "volume": 34920400
        },
        {
            "current_price": 509.9,
            "percent_change": 1.04,
            "price_change": 5.23,
            "symbol": "ADBE",
            "up": 1,
            "volume": 2795900
        },
        {
            "current_price": 434.99,
            "percent_change": 0.95,
            "price_change": 4.1,
            "symbol": "NVDA",
            "up": 1,
            "volume": 39722100
        },
        {
            "current_price": 250.22,
            "percent_change": 1.56,
            "price_change": 3.84,
            "symbol": "TSLA",
            "up": 1,
            "volume": 128346200
        },
        {
            "current_price": 506.17,
            "percent_change": 0.63,
            "price_change": 3.15,
            "symbol": "TMO",
            "up": 1,
            "volume": 1380500
        }
    ]


    const [gainers, setGainers] = React.useState(trending);
    const [loosers, setLoosers] = React.useState(trending);
    const [topVolumes, setTopVolumes] = React.useState(trending);

    useEffect(() => {
        const refresh_token = new Cookies().get('refresh_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        }
        if (refresh_token) {
            API.get('/data/top-stocks', config)
                .then(res => {
                    console.log(res.data)
                    setGainers(res.data[0].gainers);
                    setLoosers(res.data[0].losers);
                    setTopVolumes(res.data[0].highest_volume);
                }).catch(err => {
                    console.log(err);
                });
        }
    }, []);

    const table = (data) => {
        return (
            <TableContainer>
                <Table
                    sx={{
                        [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none"
                        }
                    }}
                >
                    <TableHead>
                        {/* {data[0].map} */}
                    </TableHead>
                    <TableBody>
                        {
                            data?.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell style={{ borderBottom: 'none' }}>{item.symbol}</TableCell>
                                        <TableCell style={{ borderBottom: 'none' }}>{item.percent_change}%</TableCell>
                                        <TableCell style={{ borderBottom: 'none' }}>${item.current_price.toFixed(2)}</TableCell>
                                        <TableCell style={{ borderBottom: 'none' }}>
                                            <Link to={`/chart?symbol=${item.symbol}`} style={{ textDecoration: 'none' }}>
                                                <Button>
                                                    <AddCircleOutlineIcon />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }


    return (
        <div>
            <Marque />
            <div style={classes.root} className='center'>
                <Grid container spacing={3} style={{ maxWidth: '90vw' }}>
                    <Grid container spacing={3} style={{}}>
                        <Grid item xs={12} sm={4}>
                            <Paper style={classes.paper_blue}>
                                <div className='thick'>Trending</div>
                                {table(topVolumes)}
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Paper style={classes.paper_green}>
                                <div className='thick' style={{ color: `${color.green}` }}>Top Gainers Today</div>
                                {table(gainers)}
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Paper style={classes.paper_red}>
                                <span className='thick' style={{ color: `${color.red}` }}>Top Loosers Today</span>
                                {table(loosers)}
                            </Paper>
                        </Grid>

                    </Grid>
                    <Grid container style={classes.middle}>
                        <h2>You May Interest</h2>
                        <ArrowForwardIos style={{ padding: '20px' }} />
                        <Grid container spacing={3} style={{}}>
                            <Grid item xs={12} sm={2}>
                                <Link to={`/chart?symbol=AMZN`} style={{ textDecoration: 'none' }}>
                                    <Paper style={classes.paper_blue}>
                                        <div className='thick'>AMAZON</div>
                                    </Paper>
                                </Link>
                            </Grid>

                            <Grid item xs={12} sm={2}>
                                <Link to={`/chart?symbol=GOOGL`} style={{ textDecoration: 'none' }}>
                                    <Paper style={classes.paper_green}>
                                        <div className='thick'>GOOGLE</div>
                                    </Paper>
                                </Link>
                            </Grid>

                            <Grid item xs={12} sm={2}>
                                <Link to={`/chart?symbol=AAPL`} style={{ textDecoration: 'none' }}>
                                    <Paper style={classes.paper_red}>
                                        <div className='thick'>APPLE</div>
                                    </Paper>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Link to={`/chart?symbol=NVDA`} style={{ textDecoration: 'none' }}>
                                    <Paper style={classes.paper_blue}>
                                        <div className='thick'>NVDIA</div>
                                    </Paper>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Link to={`/chart?symbol=TSLA`} style={{ textDecoration: 'none' }}>
                                    <Paper style={classes.paper_red}>
                                        <div className='thick'>TESLA</div>
                                    </Paper>
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Link to={`/chart?symbol=MSFT`} style={{ textDecoration: 'none' }}>
                                    <Paper style={classes.paper_green}>
                                        <div className='thick'>MICROSOFT</div>
                                    </Paper>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} style={classes.paper_news}>
                        <News />
                    </Grid>

                </Grid>
            </div>
        </div>
    );
};

export default Home;
