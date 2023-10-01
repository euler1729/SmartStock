import React, {useEffect} from 'react'
import DataTable from '../Data/DataTable';
import './Market.css';
import { Grid } from '@mui/material';
import Marque from '../home/Marque';
import Global from '../Global.css'
import Cookies from 'universal-cookie';
import API from '../../API';


const rows = [
    ['JANATAMF',     0,    0,    0,  6.1,    0,      0,  0,     0, ],
    ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8,  0.2,  40899, 87, 0.604, ],
    ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8,  0.2,  40899, 87, 0.604, ],
    ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8,  0.2,  40899, 87, 0.604, ],
    ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8,  0.2,  40899, 87, 0.604, ],
    ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8,  0.2,  40899, 87, 0.604, ],
    ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8,  0.2,  40899, 87, 0.604, ],
    ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8,  0.2,  40899, 87, 0.604, ],
    ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8,  0.2,  40899, 87, 0.604, ],
    ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8,  0.2,  40899, 87, 0.604, ],
    ['STPRIMFMF', 14.8, 14.9, 14.7, 14.8,  0.2,  40899, 87, 0.604, ],
    ['AAMRANET', 57.8,  59.7, 55.6, 57.8,   2, 1322921,2034, 76.736]
];
const header = ['symbol', 'open', 'high', 'low','close', 'volume', 'change(%)','current price'];

const data = [header, rows];





const Market = ()=>{
    const [table, setTable] = React.useState(data);
    const [offset, setOffset] = React.useState(0);
    const [page, setPage] = React.useState(0);

    useEffect(()=>{
        const refresh_token = new Cookies().get('refresh_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        };
        const payload = {
            'offset': offset
        };
        API.post('/data/stocks',payload, config).then(res => {
            console.log(res.data);
            let rs = [];
            res.data.forEach((item, i) => {
                rs.push([item.symbol, item.open, item.high, item.low, item.close,item.volume, item.percent_change, item.current_price]);
            })
            setTable([header, rs])
        }).catch(err => {
            console.log(err);
        });
    },[]);



    return(
        <div className='center'>
            <Marque/>
            <Grid container>
                <Grid container >

                </Grid>
                <Grid className='center'>
                    <DataTable data={table}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Market;