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
import TextField from '@mui/material/TextField';

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

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRentals, setFilteredRentals] = useState([]);


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

    useEffect(() => {
        if (availableUAVs.length === 0) return;

        const filteredData = availableUAVs.filter(uav => {
            // Customize your filtering logic here based on the search term and uav properties
            return uav.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                uav.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                uav.weight.toString().includes(searchTerm.toLowerCase()) ||
                uav.category.toLowerCase().includes(searchTerm.toLowerCase())

            // Example:  {"id":6,"brand":"a","model":"b","weight":1.0,"category":"2","is_available":true}
            // uav.category.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredRentals(filteredData);
    }, [searchTerm, availableUAVs]);

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };


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
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '1rem' }}>UAV Marketplace</h1>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    size="small"
                    style={{ marginRight: '1rem' }}
                />
            </div>



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
                        {filteredRentals.map((uav) => (
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