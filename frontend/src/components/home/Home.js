import React, { useEffect } from 'react';
import Global from '../Global.css';
import API from '../../API';



import { color } from '../../color';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DataTable from '../Data/DataTable';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, tableCellClasses } from '@mui/material';
import News from './News';
import Marque from './Marque';


const classes = {
    root: {
        flexGrow: 1,
        margin: '3vw',
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
};

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
        ['TESLA', '8%', '2B'],
        ['AAPL', '6%', '1.7B'],
        ['AMD', '5.5%', '500M']
    ]


    useEffect(() => {
        // API.get('/anonym/hello').then(res => {
        //   console.log(res)
        //   setTxt(res.data);
        // }).catch(err => {
        //   console.log(err);
        // });
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
                            data.map((item, index) => {
                                return (
                                    <TableRow key={index}>
                                        {
                                            item.map((item, index) => {
                                                return (
                                                    <TableCell key={index}>{item}</TableCell>
                                                )
                                            })
                                        }
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
                    <Grid container spacing={3} style={{ maxWidth: '90vw', margin: '3vw' }}>
                        <Grid item xs={12} sm={4}>
                            <Paper style={classes.paper_blue}>
                                <div className='thick'>Trending</div>
                                {table(trending)}
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Paper style={classes.paper_green}>
                                <div className='thick' style={{ color: `${color.green}` }}>Top Gainers Today</div>
                                {table(trending)}
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <Paper style={classes.paper_red}>
                                <span className='thick' style={{ color: `${color.red}` }}>Top Loosers Today</span>
                                {table(trending)}
                            </Paper>
                        </Grid>

                    </Grid>

                    <Grid item xs={12} >
                        <h1>Some Elements</h1>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
};

export default Home;
