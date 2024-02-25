import React, { useEffect, useState } from 'react';
import Header from '../main/header';
import { listUserRentals } from '../../api/rental';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const MyRentals = () => {
    const token: string | null = localStorage.getItem("token");
    const [userRentals, setUserRentals] = useState([]);


    useEffect(() => {
        fetchUserRentals(token); // Fetch available UAVs when the component mounts
    }, []);

    const fetchUserRentals = async (token: string) => {
        try {
            const response = await listUserRentals(token);

            const data = await response
            setUserRentals(data); // Update state with the fetched UAVs
        } catch (error) {
            console.error('Error fetching available UAVs:', error);
        }
    };



    return (
        <div>
            <Header></Header>
            <h1>My Rentals UAVs</h1>

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
                        {userRentals.map((uav) => (
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

export default MyRentals;