import React, {useEffect} from 'react'
import DataTable from '../Data/DataTable';
import './Market.css';
import { Grid } from '@mui/material';
import Marque from '../home/Marque';
import Global from '../Global.css'


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





const Market = ()=>{
    const [table, tableSet] = React.useState(null);


    useEffect(()=>{

    },[]);



    return(
        <div className='center'>
            <Marque/>
            <Grid container>
                <Grid container >

                </Grid>
                <Grid className='center'>
                    <DataTable data={data}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default Market;