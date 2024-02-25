import React, { useState, useEffect } from 'react';
import Header from '../header';
import { listUAVs } from '../../api/uav';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DetailsPopup from './details';
import { createRental } from '../../api/rental';

function Main() {
    const token: string | null = localStorage.getItem("token");
    const [availableUAVs, setAvailableUAVs] = useState([]);
    const [selectedUAV, setSelectedUAV] = useState({
        id: null,
        brand: null,
        model: null,
        weight: null,
        category: null,
    });
    const [openPopup, setOpenPopup] = useState(false); // State to control the visibility of the popup

    // Function to handle opening the popup and setting the selected UAV
    const handleOpenPopup = (uav: any) => {
        setSelectedUAV(uav);
        setOpenPopup(true);
    };


    // Function to handle closing the popup
    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    const handleRent = (uavId: number, start_date: Date, end_date: Date) => {
        console.log(start_date);
        console.log(end_date);
        createRental(token, uavId, start_date.toString(), end_date.toString());
        handleClosePopup();
    }


    useEffect(() => {
        fetchAvailableUAVs(token); // Fetch available UAVs when the component mounts
    }, []);

    const fetchAvailableUAVs = async (token: string) => {
        try {
            const response = await listUAVs(token);

            const data = await response
            setAvailableUAVs(data); // Update state with the fetched UAVs
        } catch (error) {
            console.error('Error fetching available UAVs:', error);
        }
    };

    return (
        <div>
            <Header />
            <h1>Main Page</h1>
            <p>Welcome to the main page of your application. Below are the available UAVs:</p>
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
                        {availableUAVs.map((uav) => (
                            <TableRow key={uav.id}>
                                <TableCell>{uav.brand}</TableCell>
                                <TableCell>{uav.model}</TableCell>
                                <TableCell>{uav.weight}</TableCell>
                                <TableCell>{uav.category}</TableCell>
                                <TableCell>
                                    <Button variant="text" onClick={() => handleOpenPopup(uav)}>
                                        Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <DetailsPopup open={openPopup} handleClose={handleClosePopup} uav={selectedUAV} handleRent={handleRent} />
        </div>
    );
}

export default Main;