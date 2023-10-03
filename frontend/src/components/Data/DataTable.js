import React, { useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Paper } from '@mui/material';
import Global from '../Global.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SellIcon from '@mui/icons-material/Sell';
import Cookies from 'universal-cookie';
import API from '../../API';



const DataTable = ({ data }) => {
    const [len, setLen] = React.useState(0);
    const [head, setHead] = React.useState([]);
    useEffect(() => {
        console.log(data);
        setLen(data[0].length);
        setHead(data[0]);
    }, []);

    const handleBuy = (symbl) => {
        const refresh_token = new Cookies().get('refresh_token');
        const config = {
            headers: {
                'Authorization': `Bearer ${refresh_token}`
            }
        }
        if (head[head.length - 1] === 'BUY') {
            API.post('/portfolio/buy', {
                symbol: symbl,
                quantity: 10,
            }, config).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }else{
            API.post('/portfolio/sell', {
                symbol: symbl,
                quantity: 10,
            }, config).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <Paper sx={{ width: '100vw' }} className='center'>

            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {
                                data[0]?.map((item, index) => {
                                    return (
                                        <TableCell key={index}>{item}</TableCell>
                                    )
                                })

                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            data[1].map((item, index) => {
                                return (
                                    <TableRow key={index} hover role="checkbox" tabIndex={-1}>
                                        {
                                            item.map((item, index) => {
                                                if (index == 6) {
                                                    return (
                                                        <TableCell key={index} style={{ color: item > 0 ? 'green' : 'red' }}>{item}</TableCell>
                                                    )
                                                }
                                                return (
                                                    <TableCell key={index}>{item}</TableCell>
                                                )
                                            })
                                        }

                                        {data[0].length > 8 &&
                                            <TableCell style={{ borderBottom: 'none' }}>
                                                <Link to={`/chart?symbol=${item[0]}`} style={{ textDecoration: 'none' }}>
                                                    <Button startIcon={<VisibilityIcon />}>

                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        }
                                        {
                                            data[0].length > 8 &&
                                            <TableCell style={{ borderBottom: 'none' }}>
                                                <Link to={`/chart?symbol=${item[0]}`} style={{ textDecoration: 'none' }}>
                                                    <Button startIcon={<SellIcon />} onClick={handleBuy(item[0])}>
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper >
    );

}
export default DataTable;