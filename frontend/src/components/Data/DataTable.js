import React, { useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';
import Global from '../Global.css'




const DataTable = ({ data }) => {
    useEffect(() => {
        console.log(data);
    }, []);

    return (
        <Paper sx={{width:'100vw'}} className='center'>
            
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
                                                if(index==6){
                                                    return (
                                                        <TableCell key={index} style={{color:item>0?'green':'red'}}>{item}</TableCell>
                                                    )
                                                }
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
        </Paper >
    );

}
export default DataTable;