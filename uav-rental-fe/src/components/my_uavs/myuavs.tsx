import React, { useEffect, useState } from 'react';
import Header from '../main/header';
import { listOwnedUAVs } from '../../api/uav';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const MyUAVS = () => {
    const token: string | null = localStorage.getItem("token");
    const [myUAVs, setMyUAVs] = useState([]);

    useEffect(() => {
        fetchOwnedUAVs(token); // Fetch available UAVs when the component mounts
    }, []);

    const fetchOwnedUAVs = async (token: string) => {
        try {
            const response = await listOwnedUAVs(token);

            const data = await response
            setMyUAVs(data); // Update state with the fetched UAVs
        } catch (error) {
            console.error('Error fetching available UAVs:', error);
        }
    };




    return (
        <div>
            <Header></Header>
            <h1>My UAVs</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Weight</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myUAVs.map((uav) => (
                            <TableRow key={uav.id}>
                                <TableCell>{uav.brand}</TableCell>
                                <TableCell>{uav.model}</TableCell>
                                <TableCell>{uav.weight}</TableCell>
                                <TableCell>{uav.category}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default MyUAVS;