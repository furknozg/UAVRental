import React, { useEffect, useState } from 'react';
import Header from '../header';
import { deleteRental, listUserRentals, updateRental } from '../../api/rental';
import RentalDetailsPopup from './details';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function MyRentals() {
    const token: string | null = localStorage.getItem("token");
    const [userRentals, setUserRentals] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRentals, setFilteredRentals] = useState([]);


    const [openPopup, setOpenPopup] = useState(false); // State to control the visibility of the popup
    const [rental, setRental] = useState({
        id: null,
        uav: null,
        uav_name: null,
        uav_owner: null,
        start_date: null,
        end_date: null,

    }); // State to store UAV details

    // Function to handle opening the popup and setting the selected UAV
    const handleOpenPopup = (uavDetails: any) => {
        setRental(uavDetails);
        console.log(uavDetails.start_date);
        setOpenPopup(true);
    };

    // Function to handle closing the popup
    const handleClosePopup = () => {
        setOpenPopup(false);
    };

    useEffect(() => {
        fetchUserRentals(token); // Fetch available UAVs when the component mounts
    }, []);

    useEffect(() => {
        if (userRentals.length === 0) return;

        const filteredData = userRentals.filter(rental => {
            // Customize your filtering logic here based on the search term and uav properties
            return rental.uav_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                rental.renter_username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                rental.end_date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                rental.start_date.toLowerCase().includes(searchTerm.toLowerCase())
            // Add more fields to filter as needed
            // Example:
            // uav.category.toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilteredRentals(filteredData);
    }, [searchTerm, userRentals]);

    const fetchUserRentals = async (token: string) => {
        try {
            const response = await listUserRentals(token);
            console.log(response);
            setUserRentals(response); // Update state with the fetched UAVs
        } catch (error) {
            console.error('Error fetching available UAVs:', error);
        }
    };
    const handleDeleteRequest = (id: number) => {
        try {
            deleteRental(token, id);
        } catch (error) {
            console.error(error);

        }
    }
    const handleUpdateRequest = (id: number, startDate: string, endDate: string) => {
        updateRental(token, id, startDate, endDate)
    }

    const handleSearch = (event: any) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <Header></Header>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h1 style={{ marginRight: '1rem' }}>My UAV Rentals</h1>
                <TextField
                    label="Search"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>


            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>Owner</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRentals.map((uav) => (
                            <TableRow key={uav.id}>
                                <TableCell>{uav.uav_name}</TableCell>
                                <TableCell>{uav.uav_owner}</TableCell>
                                <TableCell>{uav.start_date}</TableCell>
                                <TableCell>{uav.end_date}</TableCell>
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
            <RentalDetailsPopup open={openPopup} handleClose={handleClosePopup} rental={rental} onDelete={handleDeleteRequest} onUpdate={handleUpdateRequest} />


        </div>
    );
}

export default MyRentals;